import React, {useEffect, useState} from 'react';
import './Experience.scss';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';
import Layout from '../../components/Layout/Layout';
import TitleBar from './TitleBar/TitleBar';
import Gallery from './Gallery/Gallery';
import HostInfo from './HostInfo/HostInfo';
import Features from './Features/Features';
import Description from './Description/Description';
import Amenities from './Amenities/Amenities';
import Highlights from './Highlights/Highlights';
import BookingForm from './BookingForm/BookingForm';
import MapGoogle from '../Experiences/MapGoogle/MapGoogle';
import Comments from './Comments/Comments';
import {Link, useLocation, useParams} from 'react-router-dom';
import {getDetailsExperienceById} from '../../actions/experiencesActions';
import NoResultsFound from '../../components/NoResultsFound/NoResultsFound';
import MapExperience from './MapExperience/MapExperience';

export default function Experience({...props}) {
  const [experience, setExperience] = useState({
    name: '',
    description: '',
    currentBookings: [],
    maxCount: 0,
    featuredImage: '',
    galleryImgs: [],
    type: [],
    hosted: {
      hosted: {
        name: '',
        logo: '',
        description: '',
        reviewStart: 0,
        reviewCount: 0,
        speakLanguages: []
      },
      _id: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      imageAvatar: '',
      isAdmin: true,
      isHosted: true
    },
    address: '',
    hasGroup: true,
    minPersonForGroup: 0,
    phoneNumber: '',
    accessibility: false,
    ratesForPerson: {
      adults: 0,
      kids: 0,
      babies: 0
    },
    map: {
      lat: 0,
      lng: 0
    },
    saleOff: false,
    isAds: false,
    amenities: ['amenitie 1'],

    reviewStart: 0,
    reviewCount: 0
  });

  const location = useLocation();
  console.log('location', location.search);
  const params = useParams();
  const {place, date, hour, id} = params;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const resetError = () => {
    setError(null);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getDetailsExperienceById(id);
      setExperience(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(async () => {
    resetError();
    fetchData();
  }, []);

  return (
    <Layout>
      {!loading ? (
        <div id="experience-page">
          <div className="container">
            <TitleBar experience={experience} />
            <Gallery experience={experience} />
            <div>
              <div className="two-colums-container">
                <div className="col-8">
                  <HostInfo experience={experience} />
                  <Description experience={experience} />
                  <Features />
                  <Amenities experience={experience} />
                  <Highlights />
                  <MapExperience experience={experience} />
                </div>

                {/* <!--Sticky form--> */}
                <div className="col-4">
                  <div className="sticky-outer">
                    <div className="sticky-wrapper">
                      <div className="sticky-wrapper-inner">
                        <BookingForm
                          props={props}
                          place={place}
                          date={date}
                          hour={hour}
                          experience={experience}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* comments */}
            {/* <Comments /> */}
          </div>
        </div>
      ) : (
        !loading && <NoResultsFound />
      )}

      {/*Loading and errors */}
      {loading && <LoadingBox />}
      {error && <MessageBox variant="danger">{error}</MessageBox>}
    </Layout>
  );
}
