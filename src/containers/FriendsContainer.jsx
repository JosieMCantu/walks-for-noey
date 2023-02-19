import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { getFriends } from '../utils/api';
import { fairyDustCursor } from "cursor-effects";
import './FriendsContainer.css';


function FriendsContainer() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [friends, setFriends] = useState([]);
  const [ day ] = useState(new Date(2023, 1, 1));
  const [ dayArray, setDayArray ] = useState([]);
  const [ disabledDay, setDisabledDay ] = useState([]);

  const onClickDay = (day) => {
    const localDay = day.toLocaleDateString();
    setDayArray(dayArray.concat(localDay));
    setDisabledDay(disabledDay.concat(localDay))
  }

  const onClickClear = () => {
    setDayArray([]);
    setDisabledDay([]);
  }

  const tileDisabled = ({ date, view }) => {
    const local = date.toLocaleDateString();
    if (disabledDay.includes(local)) {
      return true
    }
  }

  useEffect(() => {
    getFriends();
  }, []);
  
  const handleSubmit = () => {
    console.log('Uploaded');
  }

  // fairyDustCursor({
  //   colors: ["#C0C0C0"],
  // });

  //console.log('Friends', friends);

  return (
    <div className='whole-container'>
      
      <div className='form'>
        <h1>*✩. Walks for Noey .✩*</h1>
        <p className='paragraph'>Thank you for being open to helping Noey and I make it through this tough time. ♥️ We love you and are eternally grateful! ♥️</p>
        <p className='kiss'>💋</p>
        <p className='paragraph'>Noey will need either a long walk (30-45 minutes) or a ride to and from daycare (10:30am dropoff, 3:30pm pickup).</p>
        <p className='paragraph'>Enter your information below and select the days you will be available to be in charge of Noey.</p>
        <p className='paragraph' style={{border: '1px dotted whitesmoke', padding: '5px', borderRadius: '5px'}}>Some people have requested to keep Noey overnight. In this case, select the nights she'll stay with you and we can work out pickup/dropoff times, as well as any other details.
        </p>
        <form onSubmit={handleSubmit}>
          <label>👻 Name:
              <input type='text' value={name === null ? '' : name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>💀 Email:
              <input type='text' value={email === null ? '' : email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>🦇 Phone:
              <input type='text' value={phone === null ? '' : phone} onChange={(e) => setPhone(e.target.value)} />
          </label>
        </form>
      </div>
      
      <div className='container'>
        <div className='calendar'>
            <main className='calendar-container'>
                <Calendar 
                    defaultActiveStartDate={new Date(2023, 2, 1)}
                    value={day} 
                    onClickDay={(day) => onClickDay(day)} 
                    // these set the days that can be selected
                    maxDate={new Date(2023, 2, 31)}
                    minDate={new Date(2023, 2, 3)}
                    tileDisabled={tileDisabled}
                    />
              <br/>
              <p className='paragraph'>
                Yay! {name}, you've selected the following days to look after Noey:
              </p>
              <ul className='paragraph'>
                {dayArray?.map((date) => {
                  return <li key={date}>{date}</li>
                })}
              </ul>
              <p className='paragraph'>Thank you again! Please wish me luck and send me positive energey. 🫶🏼</p>
              <br/>
              <div className='buttons-container'>
                <button className='button' style={{boxShadow: '0 0 108px grey'}}
                  onClick={onClickClear}>🕸️ CLEAR 🕸️</button>
                <button className='button' style={{boxShadow: '0 0 108px grey'}}
                onClick={onClickClear}>🕸️ Submit it! 🕸️</button>
              </div>
              <p className='kiss'>🧠</p>
            </main>
            
          </div>
      </div>
    </div>
  );
}

export default FriendsContainer;