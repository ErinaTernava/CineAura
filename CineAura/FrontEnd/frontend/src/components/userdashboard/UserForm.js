import { FiMail, FiCheck } from 'react-icons/fi';

const UserForm = ({ formData, setFormData, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '30px', 
        marginBottom: '30px'  
      }}>
        <div>
          <label style={{ 
            display: 'block',
            color: '#ebd0ad',
            marginBottom: '12px',  
            fontSize: '1.1rem'  
          }}>
            First Name
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            style={{ 
              width: '100%',
              padding: '14px',  
              backgroundColor: '#1a252f',
              border: '1px solid #ebd0ad',
              borderRadius: '6px', 
              color: 'white',
              fontSize: '1.1rem'  
            }}
            required
          />
        </div>
        <div>
          <label style={{ 
            display: 'block',
            color: '#ebd0ad',
            marginBottom: '12px',
            fontSize: '1.1rem'
          }}>
            Last Name
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            style={{ 
              width: '100%',
              padding: '14px',
              backgroundColor: '#1a252f',
              border: '1px solid #ebd0ad',
              borderRadius: '6px',
              color: 'white',
              fontSize: '1.1rem'
            }}
            required
          />
        </div>
      </div>
      <div style={{ marginBottom: '30px' }}>
        <label style={{ 
          display: 'block',
          color: '#ebd0ad',
          marginBottom: '12px',
          fontSize: '1.1rem'
        }}>
          Email (Cannot be changed)
        </label>
        <div style={{ display: 'flex' }}>
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            padding: '0 14px',
            backgroundColor: '#2c3e50',  
            border: '1px solid #7f8c8d', 
            borderRight: 'none',
            borderTopLeftRadius: '6px',
            borderBottomLeftRadius: '6px',
            color: '#7f8c8d' 
          }}>
            <FiMail style={{ fontSize: '1.2rem' }} />
          </div>
          <input
            type="email"
            value={formData.email}
            readOnly  
            style={{ 
              flex: 1,
              padding: '14px',
              backgroundColor: '#2c3e50',
              border: '1px solid #7f8c8d',
              borderLeft: 'none',
              borderTopRightRadius: '6px',
              borderBottomRightRadius: '6px',
              color: '#7f8c8d', 
              fontSize: '1.1rem',
              cursor: 'not-allowed'  
            }}
          />
        </div>
      </div>
      <button
        type="submit"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          padding: '16px', 
          backgroundColor: '#ebd0ad',
          color: '#0b1214',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '1.2rem' 
        }}
      >
        <FiCheck style={{ marginRight: '10px', fontSize: '1.2rem' }} />
        Save Changes
      </button>
    </form>
  );
};

export default UserForm;