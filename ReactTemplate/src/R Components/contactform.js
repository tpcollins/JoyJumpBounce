import emailjs from 'emailjs-com';
import { useCallback, useState } from 'react';
import { Circles } from 'react-loader-spinner';
import { subjectData } from '../Data/data';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    mail: '',
    number: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const handleSendMessage = useCallback(
    async (event) => {
      event.preventDefault();
      setLoading(true);

      try {
        const result = await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
          {
            name: formData.name,
            email: formData.mail,
            phone: formData.number,
            subject: formData.subject,
            message: formData.message,
          },
          process.env.NEXT_PUBLIC_EMAILJS_USER_ID || ''
        );

        console.log('Email sent:', result.text);
        setEmailSent(true); // Show the success message
      } catch (error) {
        console.error('Error sending email:', error);
      } finally {
        setLoading(false); // Stop the spinner
      }
    },
    [formData]
  );

  return (
    <div className="form-message">
      <h2 className="heading">Leave a Message</h2>
      {emailSent ? (
        <p className="thank-you-message">Thank you! Your message has been sent.</p>
      ) : (
        <form onSubmit={handleSendMessage} id="commentform" className="comment-form">
          <div className="fx flex-wrap">
            <fieldset className="name">
              <input
                type="text"
                placeholder="Full Name Here"
                required
                name="name"
                className="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
              />
            </fieldset>

            <fieldset className="email">
              <input
                type="email"
                placeholder="Email Address"
                required
                name="mail"
                className="mail"
                id="mail"
                value={formData.mail}
                onChange={handleChange}
              />
            </fieldset>

            <fieldset className="phone">
              <input
                type="text"
                placeholder="Phone Number"
                required
                name="number"
                className="number"
                id="number"
                value={formData.number}
                onChange={handleChange}
              />
            </fieldset>

            <fieldset className="select-wrap" role="group">
              <div className="select">
                <select
                  name="subject"
                  id="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Subject
                  </option>
                  {subjectData.subjects.map((item, idx) => (
                    <option key={idx} value={item.subject}>
                      {item.subject}
                    </option>
                  ))}
                </select>
              </div>
            </fieldset>

            <fieldset className="message">
              <textarea
                placeholder="Write Message"
                rows={5}
                name="message"
                className="messagewr2"
                id="messagewr2"
                value={formData.message}
                onChange={handleChange}
              />
            </fieldset>

            <button
            aria-label="Submit contact form"
            className="text-center w-max rounded-full border-2 border-orange-600 bg-stone-900 px-4 py-2 text-sm font-medium text-white shadow-md outline-none hover:bg-stone-800 focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:ring-offset-stone-800"
            disabled={loading}
            type="submit"
            >
                {loading ? (
                <Circles ariaLabel="loading" color="#ffffff" height="24" width="24" />
                ) : (
                'Send Message'
                )}
            </button>

          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm;