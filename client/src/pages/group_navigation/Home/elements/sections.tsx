import ButtonConfirm from '../../../../elements/ButtonConfirm';
import img_hero_01 from '../images/img_home_hero_001.png';
import { Link } from 'react-router-dom';
import { HREF } from '../../../../config/href';
import { SECT_01_STRUCT } from '../utils/structure';
import SectImgTextLayoutReuse from '../../../../elements/SectImgTextLayoutReuse';

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
      {SECT_01_STRUCT.map((el, i) => (
        <SectImgTextLayoutReuse
          key={i}
          img={el.img}
          img_alt={el.img_alt}
          title={el.title}
          content={el.content}
        />
      ))}
    </div>
  );
};