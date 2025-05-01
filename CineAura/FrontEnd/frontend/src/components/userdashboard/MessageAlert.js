const MessageAlert = ({ message }) => {
    return (
      <div style={{ 
        marginBottom: '20px',
        padding: '15px',
        borderRadius: '4px',
        border: message.type === 'success' ? '1px solid #2ecc71' : '1px solid #e74c3c',
        backgroundColor: message.type === 'success' ? 'rgba(46, 204, 113, 0.1)' : 'rgba(231, 76, 60, 0.1)',
        color: message.type === 'success' ? '#2ecc71' : '#e74c3c'
      }}>
        {message.text}
      </div>
    );
  };
  
  export default MessageAlert;