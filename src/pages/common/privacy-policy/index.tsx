import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="container-xxl container-p-y " style={{ textAlign: 'justify', width: '50%' }}>
      <div>
        <h2 className="mb-2">Privacy Policy</h2>
        <p className="mb-4">
          This Privacy Policy describes how InfluenceNation (<strong>the Platform</strong>) collects, uses, and protects your personal information when you use
          the Platform.
        </p>
        <ol>
          <li>
            <strong>Information We Collect:</strong>
            <ol>
              <li>We collect personal information you provide to us when creating an account, such as your name, email address, and contact details.</li>
              <li>We may also collect non-personal information, such as anonymous usage data, through the use of cookies and similar technologies.</li>
            </ol>
          </li>

          <li>
            <strong>How We Use Your Information:</strong>
            <ol>
              <li>
                We use the personal information we collect to provide and improve the Platform, respond to your inquiries and requests, and send you important
                notifications.
              </li>
              <li>
                We may also use your information for research and analysis purposes, as well as to personalize and enhance your experience on the Platform.
              </li>
            </ol>
          </li>

          <li>
            <strong>Information Sharing:</strong>
            <ol>
              <li>
                We may share your personal information with third-party service providers who assist us in operating the Platform and delivering our services.
              </li>
              <li>
                We may also disclose your information in response to a legal request or when we believe it is necessary to protect our rights, comply with a
                legal obligation, or prevent fraud or imminent harm.
              </li>
            </ol>
          </li>

          <li>
            <strong>Data Security:</strong>
            <ol>
              <li>
                We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure,
                alteration, or destruction.
              </li>
              <li>
                However, please note that no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute
                security of your information.
              </li>
            </ol>
          </li>

          <li>
            <strong>Your Choices:</strong>
            <ol>
              <li>You may update or correct your personal information by accessing your account settings on the Platform.</li>
              <li>
                You may also opt-out of receiving certain communications from us by following the unsubscribe instructions provided in those communications.
              </li>
            </ol>
          </li>

          <li>
            <strong>Changes to this Privacy Policy:</strong>
            <ol>
              <li>
                We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the revised policy will be effective when
                posted.
              </li>
            </ol>
          </li>

          <li>
            <strong>Contact Us:</strong>
            <ol>
              <li>If you have any questions or concerns about this Privacy Policy, please contact us at privacy@influencenation.com.</li>
            </ol>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
