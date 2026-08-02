import './UserBookingDetail.css';
import { PayPalButton } from 'react-paypal-button-v2';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import MessageBox from '../../../components/MessageBox/MessageBox';
import Layout from '../../../components/Layout/Layout';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getOneBookingForId } from '../../../actions/bookingsActions';

export default function Booking(props) {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const [booking, setBoking] = useState({
    experience: {},
    location: '',
    date: '',
    hour: '',
    user: {
      hosted: {
        name: '',
        logo: '',
        description: '',
        reviewStart: 0,
        reviewCount: 0,
        speakLanguages: [],
      },
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      imageAvatar: '',
      isAdmin: true,
      isHosted: true,
    },
    priceAdults: 0,
    quantityAdults: 0,
    priceKids: 0,
    quantityKids: 0,
    priceBabies: 0,
    quantityBabies: 0,
    totalPayAmount: 0,
    paymentMethod: '',
    payTransactionResult: {
      id: '',
      status: '',
      update_time: '',
      email_address: '',
    },

    state: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getOneBookingForId(id);
        setBoking(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <Layout>
      <h1>Booking {booking._id}</h1>
      <div>
        Volver
        <button onClick={() => navigate(-1)}>go back</button>
      </div>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Booking Info</h2>
                <p>
                  <strong>Responsible person:</strong> {booking.user.firstName}
                  <br />
                  <strong>Participants: </strong>
                  {booking.quantityAdults},{booking.quantityKids},{booking.quantityBabies}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {booking.paymentMethod}
                </p>
                {booking.state === 'cancel' ? (
                  <MessageBox variant="danger">{booking.state}</MessageBox>
                ) : (
                  <MessageBox variant="success">{booking.state}</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Booking Participants</h2>
                <ul>
                  <li>
                    <div className="row">
                      <div>
                        <img
                          src={booking.experience.featuredImage}
                          alt={booking.experience.name}
                          className="small"
                        ></img>
                      </div>
                      <div className="min-30">
                        <Link to={`/experience/${booking.experience._id}`}>
                          {booking.experience.name}
                        </Link>
                      </div>

                      <div>{booking.experience.totalPayAmount} €</div>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Booking Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>${booking.priceKids}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${booking.priceKids}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${booking.priceKids}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> Booking Total</strong>
                  </div>
                  <div>
                    <strong>${booking.totalPayAmount ? booking.totalPayAmount : ''}</strong>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
