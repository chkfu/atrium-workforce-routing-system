import ButtonConfirm from '../../../../elements/ButtonConfirm';
import img_hero_01 from '../images/img_home_hero_001.png';
import img_swe from '../images/img_home_content_swe.jpg';
import img_data from '../images/img_home_content_data.jpg';
import img_devops from '../images/img_home_content_devops.jpg';
import img_cyber from '../images/img_home_content_cyber.jpg';
import img_bus from '../images/img_home_content_bus.jpg';
import { Link } from 'react-router-dom';
import { HREF } from '../../../../config/href';

export const HomeHeroSect = function () {
  return (
    <div className="relative w-screen h-screen">
      <img
        src={img_hero_01}
        alt="Graduate Program 2027 - hero section"
        className="w-full h-full object-cover"
      />
      <div className="absolute h-full w-full top-0 left-0 z-10">
        <div className="absolute flex flex-col top-1/2 left-1/2 lg:left-1/4 -translate-x-1/2 -translate-y-1/2 bg-white/45 rounded-4xl p-12 min-w-3/5 lg:min-w-1/3 max-w-96 max-h-4/5 lg:max-h-3/5 duration-300 ease-in-out">
          <h4 className="font-bold text-3xl text-teal-900 py-8 justify-center lg:justify-start">
            Graduate Program 2027
          </h4>
          <p className="font-bold text-xl text-gray-800 py-1">
            Build the career you actually want.
          </p>
          <p className="font-bold text-xl text-gray-800 py-1">
            Applications are open now and close at 15 March 2027.
          </p>
          <div className="flex justify-center mt-8 py-4">
            <Link to={HREF.APPLY_INFO}>
              {' '}
              <ButtonConfirm
                label="Learn more"
                style={{ fontSize: '20px', padding: '12px 20px' }}
              />{' '}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export const HomeContent01 = function () {
  return (
    <div className="w-full py-24">
      <div className="flex justify-center p-8 text-3xl font-bold">
        <h2>Intensive Training</h2>
      </div>
      {/*  sub-sect */}
      <div className="flex flex-col justify-evenly lg:flex-row flex-wrap gap-4 py-8">
        <div className="flex-3 rounded-3xl bg-gray-100/70 flex justify-center items-center overflow-hidden">
          <img
            src={img_swe}
            alt="Software Engineering track"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-4 h-[30em] p-12 rounded-3xl bg-teal-50/70">
          <h4 className="text-2xl font-bold text-teal-900 py-2 mb-4">Software Engineering</h4>
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
        </div>
      </div>
      {/*  sub-sect */}
      <div className="flex flex-col justify-evenly lg:flex-row flex-wrap gap-4 py-8">
        <div className="flex-3 rounded-3xl bg-gray-100/70 flex justify-center items-center overflow-hidden">
          <img
            src={img_data}
            alt="Data Analysis track"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-4 h-[26em] p-12 rounded-3xl bg-teal-50/70">
          <h4 className="text-2xl font-bold text-teal-900 py-2 mb-4">Data Analysis</h4>
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
        </div>
      </div>
      {/*  sub-sect */}
      <div className="flex flex-col justify-evenly lg:flex-row flex-wrap gap-4 py-8">
        <div className="flex-3 rounded-3xl bg-gray-100/70 flex justify-center items-center overflow-hidden">
          <img
            src={img_bus}
            alt="Business Management track"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-4 h-[26em] p-12 rounded-3xl bg-teal-50/70">
          <h4 className="text-2xl font-bold text-teal-900 py-2 mb-4">Business Management</h4>
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
        </div>
      </div>
      {/*  sub-sect */}
      <div className="flex flex-col justify-evenly lg:flex-row flex-wrap gap-4 py-8">
        <div className="flex-3 rounded-3xl bg-gray-100/70 flex justify-center items-center overflow-hidden">
          <img
            src={img_cyber}
            alt="Cybersecurity track"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-4 h-[26em] p-12 rounded-3xl bg-teal-50/70">
          <h4 className="text-2xl font-bold text-teal-900 py-2 mb-4">Cybersecurity</h4>
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
        </div>
      </div>
      {/*  sub-sect */}
      <div className="flex flex-col justify-evenly lg:flex-row flex-wrap gap-4 py-8">
        <div className="flex-3 rounded-3xl bg-gray-100/70 flex justify-center items-center overflow-hidden">
          <img
            src={img_devops}
            alt="DevOps track"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-4 h-[26em] p-12 rounded-3xl bg-teal-50/70">
          <h4 className="text-2xl font-bold text-teal-900 py-2 mb-4">DevOps</h4>
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
        </div>
      </div>
    </div>
  );
};
