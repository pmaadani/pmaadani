import Navbar from '../components/Navbar';

const initiatives = [
  {
    title: 'Org-wide security logging',
    description:
      'Deployed CloudTrail Lake Event Data Stores across all AWS accounts through CloudFormation StackSets.',
  },
  {
    title: 'Plaisse infrastructure hardening',
    description:
      'Designed IAM and SSO policies to protect infrastructure security groups from manual console changes without blocking CI/CD.',
  },
  {
    title: 'Shared-services migration',
    description:
      'Led the phased migration of Chef Server, Automate, and compliance tooling to a centralized platform.',
  },
  {
    title: 'Multi-account IaC delivery',
    description:
      'Rolled out StackSets for CodeDeploy and artifact repositories and migrated legacy Stacker and CDK stacks to Terraform.',
  },
];

const currentRoleAchievements = [
  'Led migration of CloudFormation, CDK, and Stacker-managed infrastructure to Terraform, including importing existing AWS resources into Terraform state.',
  'Deployed CloudTrail Lake Event Data Stores organization-wide through CloudFormation StackSets, enabling centralized security-event queries across AWS accounts.',
  'Designed and validated IAM guardrails for Plaisse infrastructure security groups, blocking manual console rule changes while preserving CI/CD access.',
  'Led multi-environment CloudFormation StackSet rollouts for CodeDeploy and artifact repository infrastructure across development, QA, and production.',
  'Drove the Chef infrastructure migration to a centralized shared-services platform, including phased cutover of Chef Server, Automate, and compliance services.',
  'Implemented CloudFormation Hooks to enforce correct Amazon API Gateway logging-role configuration during resource lifecycle operations.',
  'Standardized S3 access logging, VPC Flow Logs, CloudFront logging, API Gateway log groups, and WAF monitoring.',
  'Designed and automated infrastructure using AWS CDK, CloudFormation, StackSets, and Terraform.',
  'Enabled AWS Bedrock foundation models and invocation logging in production to support enterprise AI workloads.',
  'Led automation to identify and clean up IAM roles unused for more than three years.',
  'Built automation to identify untagged AWS resources and improve governance and cloud accountability.',
  'Enhanced Jenkins automation and Slack notifications to detect missing deployment markers automatically.',
  'Implemented CloudFront caching strategies and S3 lifecycle and retention policies for cost and performance optimization.',
  'Supported production operations through incident triage, log- and metric-driven debugging, root-cause analysis, and remediation.',
];

const previousRoleAchievements = [
  'Designed and implemented scalable REST and gRPC APIs in Go and Python using JWT and SSO/SAML authentication.',
  'Integrated Bandwidth and IntelePeer messaging and call-processing services with retry logic and operational visibility.',
  'Deployed gRPC messaging services on Amazon EKS and integrated Twilio and Bandwidth for high-throughput workflows.',
  'Improved event-processing resilience across RabbitMQ, Logstash, SQS, and Lambda.',
  'Standardized API interfaces with OpenAPI and Swagger.',
  'Implemented multi-region reliability strategies using S3 replication and API Gateway deployment patterns.',
  'Built logging and monitoring dashboards with Grafana, CloudWatch, and OpenSearch.',
  'Contributed to CI/CD and deployment automation to support safe, iterative production releases.',
  'Developed backend services and cloud integrations for internal and customer-facing systems.',
];

function ExperienceRole({ title, company, location, dates, achievements }) {
  return (
    <section className="experience-role">
      <div className="experience-heading">
        <div>
          <h3>{title}</h3>
          <p className="company-name">
            {company} · {location}
          </p>
        </div>

        <p className="experience-date">{dates}</p>
      </div>

      <ul className="achievement-list">
        {achievements.map((achievement) => (
          <li key={achievement}>{achievement}</li>
        ))}
      </ul>
    </section>
  );
}

export default function About() {
  return (
    <div className="about-page">
      <Navbar />

      <main className="about-frame">
        <header className="resume-hero">
          <div className="resume-intro">
            <p className="eyebrow">Software Engineer / Cloud Engineer</p>

            <h1 className="about-title">Parisa Maadani</h1>

            <p className="about-subtitle">
              Building secure cloud infrastructure, backend systems, and
              reliable production platforms.
            </p>
          </div>

          <div className="resume-contact">
            <a href="mailto:p.maadani90@gmail.com">
              p.maadani90@gmail.com
            </a>

            <a href="tel:+18188057321">(818) 805-7321</a>

            <span>Los Angeles, CA</span>

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </header>

        <section className="about-grid">
          <aside className="about-sidebar">
            <div className="profile-card">
              <img
                className="avatar"
                src="/photo.png"
                alt="Parisa Maadani"
              />

              <div className="profile-content">
                <h2>Profile</h2>

                <p>
                  Cloud and backend engineer with 9+ years of experience
                  building secure, scalable systems and production
                  infrastructure.
                </p>

                <a
                  className="resume-button"
                  href="/pmaadani.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  View résumé PDF
                </a>
              </div>
            </div>

            <section className="sidebar-section">
              <h2>Core technologies</h2>

              <div className="skill-tags">
                {[
                  'Python',
                  'Go',
                  'Terraform',
                  'CloudFormation',
                  'AWS CDK',
                  'GitLab',
                  'Jenkins',
                  'Chef',
                  'AWS IAM',
                  'AWS SSO',
                  'StackSets',
                  'CloudTrail Lake',
                  'Lambda',
                  'API Gateway',
                  'Bedrock',
                  'EKS',
                  'PostgreSQL',
                  'Docker',
                  'Kubernetes',
                ].map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>
            </section>

            <section className="sidebar-section">
              <h2>Education</h2>

              <div className="education-item">
                <strong>Master’s in Computer Science</strong>
                <span>Vanderbilt University</span>
                <small>August 2022 – April 2024</small>
              </div>

              <div className="education-item">
                <strong>Bachelor’s in Computer Science</strong>
                <span>Azad University of Tehran</span>
              </div>
            </section>

            <section className="sidebar-section">
              <h2>Certification</h2>

              <div className="education-item">
                <strong>
                  AWS Certified Solutions Architect – Associate
                </strong>
                <span>Amazon Web Services</span>
                <small>2025</small>
              </div>
            </section>
          </aside>

          <article className="resume-content">
            <section className="resume-section summary-section">
              <div className="section-heading">
                <span>01</span>
                <h2>Professional summary</h2>
              </div>

              <p>
                Software Engineer with 9+ years of experience building secure,
                scalable web applications, backend services, and cloud
                infrastructure. Strong background in AWS, distributed systems,
                and production reliability, with hands-on experience in
                observability, incident response, infrastructure automation,
                and secure authentication systems.
              </p>

              <p>
                Proven ability to design modern APIs, improve cloud operations,
                and collaborate across teams to deliver resilient,
                maintainable solutions.
              </p>
            </section>

            <section className="resume-section">
              <div className="section-heading">
                <span>02</span>
                <h2>Selected initiatives</h2>
              </div>

              <div className="initiative-grid">
                {initiatives.map((initiative) => (
                  <article
                    className="initiative-card"
                    key={initiative.title}
                  >
                    <h3>{initiative.title}</h3>
                    <p>{initiative.description}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="resume-section">
              <div className="section-heading">
                <span>03</span>
                <h2>Professional experience</h2>
              </div>

              <ExperienceRole
                title="Cloud Software Engineer"
                company="PennyMac"
                location="Los Angeles, CA"
                dates="Jan 2024 – Present"
                achievements={currentRoleAchievements}
              />

              <ExperienceRole
                title="Software Engineer"
                company="PennyMac"
                location="Los Angeles, CA"
                dates="July 2016 – Jan 2024"
                achievements={previousRoleAchievements}
              />
            </section>
          </article>
        </section>
      </main>
    </div>
  );
}