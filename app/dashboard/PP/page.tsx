export default function Component() {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Privacy Policy</h1>
            <p className="mt-4 text-muted-foreground">Effective Date: August 14, 2024</p>
          </div>
          <div className="prose prose-lg text-muted-foreground">
            <p>
              At Acme AI, we are committed to protecting the privacy and security of our users. This Privacy Policy
              explains how we collect, use, and safeguard the personal information you provide when using our AI content
              generation service.
            </p>
            <br/>
            <strong><h2>Information We Collect</h2></strong>
            <p>When you use our AI service, we collect the following information:</p>
            <ul>
              <li>
                <strong>User-generated Content:</strong> This includes the text, images, or other content you provide to
                our AI system for generation or processing.
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you interact with our service, such as the features you
                use, the frequency and duration of your sessions, and any errors or issues you encounter.
              </li>
              <li>
                <strong>Device and Browser Information:</strong> Technical information about the device and browser you
                use to access our service, such as your IP address, operating system, and browser type.
              </li>
            </ul>
            <h2>How We Use Your Information</h2>
            <p>We use the information we collect for the following purposes:</p>
            <ul>
              <li>
                <strong>Improving Our AI:</strong> We use the user-generated content and usage data to train and improve
                our AI models, ensuring that our service provides high-quality and relevant content.
              </li>
              <li>
                <strong>Providing and Enhancing Our Service:</strong> We use the information to deliver our AI content
                generation service, troubleshoot issues, and develop new features and functionalities.
              </li>
              <li>
                <strong>Ensuring Security and Compliance:</strong> We use the information to detect and prevent
                unauthorized access, fraud, and other illegal or harmful activities, as well as to comply with legal and
                regulatory requirements.
              </li>
            </ul>
            <h2>Data Storage and Security</h2>
            <p>
              We take the security of your information seriously and implement various measures to protect it, including:
            </p>
            <ul>
              <li>
                <strong>Encryption:</strong> We use industry-standard encryption techniques to protect your data during
                transmission and storage.
              </li>
              <li>
                <strong>Access Controls:</strong> We limit access to your information to only those employees and
                third-party service providers who need it to perform their duties.
              </li>
              <li>
                <strong>Monitoring and Logging:</strong> We continuously monitor our systems for any suspicious activity
                and maintain detailed logs of all access and changes to your information.
              </li>
            </ul>
            <p>
              We store your information for as long as necessary to fulfill the purposes outlined in this Privacy Policy,
              or as required by applicable laws and regulations.
            </p>
            <h2>Your Rights and Choices</h2>
            <p>You have the following rights and choices regarding your personal information:</p>
            <ul>
              <li>
                <strong>Access and Deletion:</strong> You can request access to the personal information we hold about you
                and request that we delete your information.
              </li>
              <li>
                <strong>Opt-out:</strong> You can opt-out of certain data processing activities, such as the use of your
                user-generated content for AI training purposes.
              </li>
              <li>
                <strong>Data Portability:</strong> You can request a copy of your personal information in a structured,
                commonly used, and machine-readable format.
              </li>
            </ul>
            <p>
              To exercise these rights or if you have any questions or concerns about our privacy practices, please
              contact us at <a href="#">privacy@acme-ai.com</a>.
            </p>
          </div>
        </div>
      </div>
    )
  }