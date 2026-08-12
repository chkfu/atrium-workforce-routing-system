import img_swe from '../images/img_home_content_swe.jpg';
import img_data from '../images/img_home_content_data.jpg';
import img_devops from '../images/img_home_content_devops.jpg';
import img_cyber from '../images/img_home_content_cyber.jpg';
import img_bus from '../images/img_home_content_bus.jpg';

export const SECT_01_STRUCT: {
  title: string;
  img: string;
  img_alt: string;
  content: JSX.Element;
}[] = [
  {
    title: 'Software Engineering',
    img: img_swe,
    img_alt: 'Software Engineering track',
    content: (
      <>
        <p className="text-lg text-justify">
          Over 14 weeks, an Atrium instructor takes you from your first commit to shipping
          production-ready code, with on-the-job training that mirrors a real engineering team.
        </p>
        <ul className="text-lg list-disc p-4">
          <li>JavaScript & Python</li>
          <li>Git & version control</li>
          <li>Application deployment</li>
          <li>Debugging & code review</li>
          <li>Team collaboration</li>
        </ul>
      </>
    ),
  },
  {
    title: 'Data Analysis',
    img: img_data,
    img_alt: 'Data Analysis track',
    content: (
      <>
        <p className="text-lg text-justify">
          You'll spend 14 weeks under the guidance of an Atrium instructor, working with real
          datasets and on-the-job training to learn how analysts actually turn numbers into
          decisions.
        </p>
        <ul className="text-lg list-disc p-4">
          <li>SQL & Excel</li>
          <li>Python for data analysis</li>
          <li>Data visualization</li>
          <li>Statistical thinking</li>
          <li>Reporting & storytelling</li>
        </ul>
      </>
    ),
  },
  {
    title: 'Business Management',
    img: img_bus,
    img_alt: 'Business Management track',
    content: (
      <>
        <p className="text-lg text-justify">
          This 10-week track pairs classroom strategy sessions with a placement at headquarters,
          where an Atrium mentor coaches you through real planning and leadership decisions.
        </p>
        <ul className="text-lg list-disc p-4">
          <li>Project planning</li>
          <li>Budgeting & forecasting</li>
          <li>Stakeholder communication</li>
          <li>Team leadership</li>
          <li>Strategic decision-making</li>
        </ul>
      </>
    ),
  },
  {
    title: 'Cybersecurity',
    img: img_cyber,
    img_alt: 'Cybersecurity track',
    content: (
      <>
        <p className="text-lg text-justify">
          A 12-week hands-on lab led by Atrium security specialists puts you through red-team and
          blue-team simulations, then has you shadow a live incident response team.
        </p>
        <ul className="text-lg list-disc p-4">
          <li>Network security</li>
          <li>Threat detection</li>
          <li>Risk assessment</li>
          <li>Incident response</li>
          <li>Security tools & protocols</li>
        </ul>
      </>
    ),
  },
  {
    title: 'DevOps',
    img: img_devops,
    img_alt: 'DevOps track',
    content: (
      <>
        <p className="text-lg text-justify">
          This 8-week rotation blends short, focused workshops with a stint embedded at
          headquarters, working alongside Atrium engineers on live infrastructure.
        </p>
        <ul className="text-lg list-disc p-4">
          <li>CI/CD pipelines</li>
          <li>Cloud infrastructure</li>
          <li>Containerization (Docker)</li>
          <li>Monitoring & logging</li>
          <li>Automation scripting</li>
        </ul>
      </>
    ),
  },
];
