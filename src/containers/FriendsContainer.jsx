import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { getFriends, makeFriends, deleteFriend } from '../utils/api';
import { fairyDustCursor } from "cursor-effects";
import { useMediaQuery } from 'react-responsive';
import './FriendsContainer.css';


function FriendsContainer() {
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ phone, setPhone ] = useState('');
  const [ note, setNote ] = useState('');
  const [ dayArray, setDayArray ] = useState([]);
  const [ friends, setFriends ] = useState([]);
  const [ day ] = useState(new Date(2023, 1, 1));
  const [ disabledDay, setDisabledDay ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  const onClickDay = (day) => {
    const localDay = day.toLocaleDateString();
    setDayArray(dayArray.concat(localDay));
    setDisabledDay(disabledDay.concat(localDay))
  }

  const onClickClear = () => {
    setDayArray([]);
    setDisabledDay([]);
  }

  const tileDisabled = ({ date }) => {
    const local = date.toLocaleDateString();
    if (disabledDay.includes(local)) {
      return true
    }
  }

  const createFriend = (name, email, phone, note, dayArray) => {
    let obj = {};
    obj['name'] = name;
    obj['email'] = email;
    obj['phone'] = phone;
    obj['note'] = note;
    obj['days'] = dayArray;
    makeFriends(obj);
  }

  const deleteFriends = (id) => {
    deleteFriend(id);
    setFriends(friends.filter((friend) => friend.id !== id));
  }
  
  useEffect(() => {
    getFriends()
    .then((result) => {
      setFriends(result)
      if (result) {
        result.map((day) => {
          return day.days.map((item) => {
            return disabledDay.push(item)
          })
        })
      }
    })
    .finally(() => setLoading(false));
  }, [disabledDay]);
  
  fairyDustCursor({
    colors: ["#C0C0C0"],
  });

  const isMobile = useMediaQuery({query: '(min-device-width: 414px)',})

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className='whole-container'>
      <div className='form-container'>
        <h1>*✩. Walks for Noey .✩*</h1>
        <p className='paragraph'>Thank you for being open to helping Noey and I make it through this tough time. </p>
        <p className='paragraph'>♥️ We love you and are eternally grateful! ♥️</p>
        <p className='kiss'>💋</p>
        <p className='paragraph'>It will be a huge relief to me knowing Noey is being looked after. She'll need either a long walk (30-45 minutes), a trip to the smol dog section of <a href="https://goo.gl/maps/82FtWAzMXzhW15gF6">Normandale dog park</a> for awhile or a ride to and from daycare (M-F only) at <a href="https://goo.gl/maps/PEoTjDXi7EcW5JwR6">Dogs in the City</a> (10:30am dropoff, 3:30pm pickup).</p>
        <p className='paragraph'>Enter your information below and select the days you will be available to be in charge of Noey.</p>
        <p className='paragraph' style={{border: '1px dotted whitesmoke', padding: '5px', borderRadius: '5px'}}>Some people have requested to keep Noey overnight. In this case, select the nights she'll stay with you and we can work out pickup/dropoff times, as well as any other details.
        </p>
        <form>
          <section className='section-one'>
              <label>🥀 Name:<br/>
                  <input type='text' value={name === null ? '' : name} onChange={(e) => setName(e.target.value)} />
              </label>
              <label>💀 Email:<br/>
                  <input type='text' value={email === null ? '' : email} onChange={(e) => setEmail(e.target.value)} />
              </label>
              <label>🦇 Phone:<br/>
                  <input type='text' value={phone === null ? '' : phone} onChange={(e) => setPhone(e.target.value)} />
              </label>
          </section>
          <section className='section-two'>
              <label>🌙 Note:<br/>
                  <textarea rows="8" cols={isMobile ? "50" : "30"} type='text' value={note === null ? '' : note} onChange={(e) => setNote(e.target.value)} />
              </label>
          </section>
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
                    minDate={new Date(2023, 2, 5)}
                    maxDate={new Date(2023, 2, 31)}
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
              <p className='paragraph'>Thank you again!✨ Please wish me luck and send me positive energy. 🫶🏼</p>
              <br/>
              <div className='buttons-container'>
                <button className='button' style={{boxShadow: '0 0 108px grey'}}
                  onClick={onClickClear}>🕸️ CLEAR ME 🕸️</button>
                <button className='button' style={{boxShadow: '0 0 108px grey'}}
                onClick={() => createFriend(name, email, phone, note, dayArray)}>🕸️ SUBMIT ME 🕸️</button>
              </div>
              <p className='kiss'>🧠</p>
              <div className = 'friends-container'>
                {friends.map((friend) => {
                  return <ul key={friend.id} className='friend-card'>
                    <li>{friend.name}</li>
                    <li>{friend.note}</li>
                    <li className='friend-days'>{friend.days.map((day) => {
                      return (<div key={Math.random()}>{day}</div>)
                    })}</li>
                    <li><button onClick={() => deleteFriends(friend.id)}>DELETE ME</button></li>
                  </ul>
                })}
              </div>
            </main>
          </div>
      </div>
    </div>
  );
}

export default FriendsContainer;
