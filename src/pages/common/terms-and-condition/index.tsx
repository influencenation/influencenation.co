import { Link } from 'react-router-dom';

const TermsAndCondition = () => {
  return (
    <div className="container-xxl container-p-y " style={{ textAlign: 'justify', width: '50%' }}>
      <div>
        <h2 className="mb-2 ">Terms and Conditions</h2>
        <p className="mb-4">
          Please read these terms and conditions (<strong>Terms</strong>) carefully before using InfluenceNation (<strong>the Platform</strong>). These Terms
          govern your access to and use of the Platform, including any services, features, or functionalities offered by InfluenceNation.
        </p>
        <ol>
          <li>
            <strong>Account Registration:</strong>
            <p>1.1 You must be at least 18 years old to create an account on InfluenceNation.</p>
            <p>1.2 You agree to provide accurate, current, and complete information during the registration process.</p>
            <p>
              1.3 You are responsible for maintaining the confidentiality of your account credentials and are solely responsible for all activities that occur
              under your account.
            </p>
            <p>1.4 You must notify InfluenceNation immediately of any unauthorized use or suspected security breach of your account.</p>
          </li>

          <li>
            <strong>Platform Usage:</strong>
            <p>2.1 The Platform connects influencers and brands for collaborations and promotions.</p>
            <p>2.2 As an influencer, you agree to comply with the guidelines and requirements set forth by brands when participating in promotions.</p>
            <p>
              2.3 As a brand, you agree to provide accurate and detailed information about your promotional campaigns and honor any agreements made with
              influencers.
            </p>
            <p>
              2.4 InfluenceNation does not endorse, guarantee, or take responsibility for the content, products, or services offered by influencers or brands.
            </p>
          </li>

          <li>
            <strong>Intellectual Property:</strong>
            <p>
              3.1 You acknowledge and agree that InfluenceNation and its licensors retain ownership of all intellectual property rights in the Platform,
              including but not limited to trademarks, logos, and copyrights.
            </p>
            <p>3.2 You may not use, reproduce, modify, or distribute any content from the Platform without prior written permission from InfluenceNation.</p>
          </li>

          <li>
            <strong>Termination:</strong>
            <p>
              4.1 InfluenceNation reserves the right to suspend or terminate your access to the Platform at any time for violation of these Terms or any
              applicable laws.
            </p>
            <p>4.2 Upon termination, your account and all associated data may be permanently deleted.</p>
          </li>

          <li>
            <strong>Disclaimer of Warranties:</strong>
            <p>5.1 InfluenceNation provides the Platform on an "as is" and "as available" basis without any warranties, express or implied.</p>
            <p>5.2 InfluenceNation does not warrant that the Platform will be uninterrupted, error-free, or secure.</p>
          </li>

          <li>
            <strong>Limitation of Liability:</strong>
            <p>
              6.1 InfluenceNation and its affiliates, officers, directors, employees, agents, and licensors shall not be liable for any indirect, incidental,
              special, consequential, or exemplary damages.
            </p>
            <p>
              6.2 To the maximum extent permitted by applicable law, InfluenceNation's total liability for any claim arising out of or relating to these Terms
              or the Platform shall not exceed the amount paid by you, if any, to InfluenceNation in the twelve (12) months prior to the claim.
            </p>
          </li>

          <li>
            <strong>Indemnification:</strong>
            <p>
              7.1 You agree to indemnify and hold harmless InfluenceNation and its affiliates, officers, directors, employees, agents, and licensors from any
              claims, liabilities, damages, losses, and expenses (including reasonable attorneys' fees) arising out of or relating to your use of the Platform
              or violation of these Terms.
            </p>
          </li>

          <li>
            <strong>Governing Law and Jurisdiction:</strong>
            <p>8.1 These Terms shall be governed by and construed in accordance with the laws of Federation of Bosnia and Herzegovina.</p>
            <p>
              8.2 Any dispute arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Federation of
              Bosnia and Herzegovina.
            </p>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default TermsAndCondition;
