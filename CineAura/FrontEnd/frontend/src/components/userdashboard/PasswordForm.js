import { FiLock, FiCheck } from 'react-icons/fi';

const PasswordForm = ({ passwordForm, setPasswordForm, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ 
          display: 'block',
          color: '#ebd0ad',
          marginBottom: '8px',
          fontSize: '0.9rem'
        }}>
          Current Password
        </label>
        <div style={{ display: 'flex' }}>
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
            backgroundColor: '#1a252f',
            border: '1px solid #ebd0ad',
            borderRight: 'none',
            borderTopLeftRadius: '4px',
            borderBottomLeftRadius: '4px',
            color: '#ebd0ad'
          }}>
            <FiLock />
          </div>
          <input
            type="password"
            value={passwordForm.oldPassword}
            onChange={(e) => setPasswordForm({...passwordForm, oldPassword: e.target.value})}
            style={{ 
              flex: 1,
              padding: '12px',
              backgroundColor: '#1a252f',
              border: '1px solid #ebd0ad',
              borderLeft: 'none',
              borderTopRightRadius: '4px',
              borderBottomRightRadius: '4px',
              color: 'white'
            }}
            required
          />
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ 
          display: 'block',
          color: '#ebd0ad',
          marginBottom: '8px',
          fontSize: '0.9rem'
        }}>
          New Password
        </label>
        <div style={{ display: 'flex' }}>
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
            backgroundColor: '#1a252f',
            border: '1px solid #ebd0ad',
            borderRight: 'none',
            borderTopLeftRadius: '4px',
            borderBottomLeftRadius: '4px',
            color: '#ebd0ad'
          }}>
            <FiLock />
          </div>
          <input
            type="password"
            value={passwordForm.newPassword}
            onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
            style={{ 
              flex: 1,
              padding: '12px',
              backgroundColor: '#1a252f',
              border: '1px solid #ebd0ad',
              borderLeft: 'none',
              borderTopRightRadius: '4px',
              borderBottomRightRadius: '4px',
              color: 'white'
            }}
            required
          />
        </div>
      </div>

      <div style={{ marginBottom: '25px' }}>
        <label style={{ 
          display: 'block',
          color: '#ebd0ad',
          marginBottom: '8px',
          fontSize: '0.9rem'
        }}>
          Confirm New Password
        </label>
        <div style={{ display: 'flex' }}>
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
            backgroundColor: '#1a252f',
            border: '1px solid #ebd0ad',
            borderRight: 'none',
            borderTopLeftRadius: '4px',
            borderBottomLeftRadius: '4px',
            color: '#ebd0ad'
          }}>
            <FiLock />
          </div>
          <input
            type="password"
            value={passwordForm.confirmPassword}
            onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
            style={{ 
              flex: 1,
              padding: '12px',
              backgroundColor: '#1a252f',
              border: '1px solid #ebd0ad',
              borderLeft: 'none',
              borderTopRightRadius: '4px',
              borderBottomRightRadius: '4px',
              color: 'white'
            }}
            required
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
          padding: '12px',
          backgroundColor: '#ebd0ad',
          color: '#0b1214',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '1rem'
        }}
      >
        <FiCheck style={{ marginRight: '8px' }} />
        Update Password
      </button>
    </form>
  );
};

export default PasswordForm;