import React, {useEffect, useState, ref} from 'react';
import './UserBookingHistory.scss';
import {useDispatch, useSelector} from 'react-redux';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import MessageBox from '../../../components/MessageBox/MessageBox';
import Layout from '../../../components/Layout/Layout';
import {useLocation, useNavigate} from 'react-router-dom';
import NoResultsFound from '../../../components/NoResultsFound/NoResultsFound';
import {changeBookingState, getAllBookingsForUser} from '../../../actions/bookingsActions';
import {Button} from '../../../components/Button';
import ProfileTabs from '../LayoutUserProfile';
import LayoutUserProfile from '../LayoutUserProfile';
import {Modal} from '@mui/material';
import {makeStyles} from '@material-ui/core/styles';
import BookingCard from '../../../components/BookingCard/BookingCard';

export default function UserBookingHistory(props) {
  //Data
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [update, setUpdate] = useState(0);
  const [bookingSelect, setBookingSelect] = useState('');

  const selectBooking = (booking) => {
    setBookingSelect(booking);
    openCloseModal();
  };

  const getDataBookings = async () => {
    try {
      setLoading(true);
      const data = await getAllBookingsForUser();
      setBookings(data);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
    setLoading(false);
  };

  //UseEffect
  useEffect(() => {
    getDataBookings();
  }, [update]);

  const [modal, setModal] = useState(false);
  //Control modal
  const openCloseModal = () => {
    setModal(!modal);
  };

  //=======================================================================
  //Change Booking State
  //=======================================================================
  const [bookingState, setBookingState] = useState('');

  //Control from
  const handleRadioBookingState = async (event) => {
    console.log('Booking', event.target.value);
    setBookingState({state: event.target.value});
  };

  //Change booking state
  const handlerChangeBookingState = async () => {
    try {
      setLoading(true);
      const data = await changeBookingState(bookingSelect._id, bookingState);
      if (data) {
        setUpdate(update + 1);
        openCloseModal();
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
    setLoading(false);
  };

  //View modal
  const modalDetailsBooking = (
    <div id="modal">
      <div className="modal">
        <div>
          <h3>Edit Boking estate</h3>
        </div>
        <div className="modal-body" onChange={handleRadioBookingState}>
          <div className="input-container">
            <input type="radio" value="booked" name="bookingState" />
            <label>Booked</label>
          </div>

          <div className="input-container">
            <input type="radio" value="cancel" name="bookingState" />
            <label>Cancel</label>
          </div>
        </div>
        <div className="modal-footer">
          <Button outline onClick={openCloseModal}>
            Cancel
          </Button>
          <Button contained onClick={() => handlerChangeBookingState()}>
            Change State
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <LayoutUserProfile>
      <div className="content-page">
        <div className="container profile-container">
          <div className="header">
            <h1>Booking History</h1>
          </div>
          <div className="profile-content">
            {loading ? (
              <LoadingBox></LoadingBox>
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <>
                <div id="user-booking-history">
                  <div className="grid">
                    {bookings.map((booking, index) => (
                      <BookingCard
                        key={booking._id}
                        booking={booking}
                        setBookingSelect={selectBooking}
                      />
                    ))}
                  </div>
                </div>

                {/* Modal */}
                <Modal open={modal} onClose={openCloseModal}>
                  {modalDetailsBooking}
                </Modal>
              </>
            )}
          </div>
        </div>
      </div>
    </LayoutUserProfile>
  );
}
