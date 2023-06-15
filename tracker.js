class InfluenceTracker {
  #localStorageLastViewedProduct = "@influencenation:last_viewed";
  #localStorageLastBuyedProduct = "@influencenation:last_buyed";
  #localStorageKey = "@influencenation";
  #searchKey = "https://www.influencenation.co";
  #url = "https://api.influencenation.co";
  #paths = null;
  #accessToken = "";
  #observer = new PerformanceObserver(this.#observerlistener.bind(this));

  start(apiKey) {
    const key = apiKey ? apiKey : this.#getApiKey();
    if (key) this.#auth(key);
    else
      throw new Error(
        "Can not auth on influencenation.co, please check you apiKey"
      );

    window.onload = () => this.#view();
    this.#observer.observe({
      entryTypes: ["resource"],
    });

    return this;
  }

  #getApiKey() {
    var scripts = document.getElementsByTagName("script");
    return Object.keys(scripts)
      .map((i) => {
        if (scripts[i].src.startsWith(this.#searchKey)) {
          const [, query] = scripts[i].src.split("?");
          const [, key] =
            query
              .split("&")
              .find((x) => x.startsWith("apiKey="))
              ?.split("=") || [];
          if (key) return key;
        }
        return null;
      })
      .find((x) => x);
  }

  #auth(apiKey) {
    this.#request(`tracker/activate/${apiKey}`, {
      ident: "somethinguniq",
    }).then((output) => {
      window.localStorage.setItem(
        this.#localStorageKey,
        `${output.accessToken}|${output.paths}`
      );
    });
  }

  #view() {
    const code = this.#getCode();
    const lastProduct = window.localStorage.getItem(
      this.#localStorageLastViewedProduct
    );
    if (code && code !== lastProduct)
      this.#request(`tracker/view/${code}`, { url: window.location.href }).then(
        (x) => {
          window.localStorage.setItem(
            this.#localStorageLastViewedProduct,
            code
          );
        }
      );
  }

  #observerlistener(list) {
    const paths = this.#getPaths();
    for (const entry of list.getEntries()) {
      if (
        entry.initiatorType === "fetch" ||
        entry.initiatorType === "xmlhttprequest"
      ) {
        if (
          entry.responseStatus >= 200 &&
          entry.responseStatus < 300 &&
          paths?.find((p) => entry.name.startsWith(p))
        )
          this.#buy();
      }
    }
  }

  #buy() {
    const lastViewed = window.localStorage.getItem(
      this.#localStorageLastViewedProduct
    );
    const lastBuyed = window.localStorage.getItem(
      this.#localStorageLastBuyedProduct
    );
    if (lastBuyed !== lastViewed)
      this.#request(`tracker/buy/${lastViewed}`, {
        url: window.location.href,
      }).then((output) => {
        window.localStorage.setItem(
          this.#localStorageLastBuyedProduct,
          lastViewed || ""
        );
      });
  }

  #getCode() {
    const [, query] = window.location.href.split("?");
    const [, value] =
      query
        ?.split("&")
        ?.find((x) => x.startsWith("isn"))
        ?.split("=") || [];
    return value;
  }

  #getAccessToken() {
    if (this.#accessToken) return this.#accessToken;

    const output = window.localStorage.getItem(this.#localStorageKey);
    if (!output) return null;

    const [accessToken] = output.split("|");
    this.#accessToken = accessToken;

    return this.#accessToken;
  }

  #getPaths() {
    if (this.#paths) return this.#paths;

    const output = window.localStorage.getItem(this.#localStorageKey);
    if (!output) return null;

    const [, paths] = output.split("|");
    this.#paths = paths.split(",");

    return this.#paths;
  }

  #request(path, json) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", `${this.#url}/${path}`, true);

      const accessToken = this.#getAccessToken();
      if (accessToken)
        xhr.setRequestHeader("authorization", `Bearer ${accessToken}`);

      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = () => {
        // Call a function when the state changes.
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200 || xhr.status === 201)
            resolve(JSON.parse(xhr.responseText));
          else reject(xhr.responseText);
        }
      };
      xhr.send(JSON.stringify(json));
    });
  }
}

new InfluenceTracker().start();

//export {};
