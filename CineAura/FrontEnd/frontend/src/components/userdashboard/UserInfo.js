import { FiMail } from 'react-icons/fi';

const UserInfo = ({ userData }) => {
  return (
    <div style={{ marginTop: '40px' }}>
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0px', 
        marginBottom: '30px'  
      }}>
        <div>
          <h3 style={{ 
            color: '#7f8c8d',
            fontSize: '1.1rem',  
            marginBottom: '12px' 
          }}>
            First Name
          </h3>
          <p style={{ 
            color: '#ebd0ad',
            fontSize: '1.4rem',  
            fontWeight: '500'
          }}>
            {userData.firstName}
          </p>
        </div>
        <div>
          <h3 style={{ 
            color: '#7f8c8d',
            fontSize: '1.1rem',
            marginBottom: '12px'
          }}>
            Last Name
          </h3>
          <p style={{ 
            color: '#ebd0ad',
            fontSize: '1.4rem',
            fontWeight: '500'
          }}>
            {userData.lastName}
          </p>
        </div>
      </div>
      <div>
        <h3 style={{ 
          color: '#7f8c8d',
          fontSize: '1.1rem',
          marginBottom: '12px'
        }}>
          Email
        </h3>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FiMail style={{ 
            marginRight: '15px',  
            color: '#7f8c8d',
            fontSize: '1.2rem'
          }} />
          <p style={{ 
            color: '#ebd0ad',
            fontSize: '1.4rem',
            fontWeight: '500'
          }}>
            {userData.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;