import { subjectData } from "../Data/data";

const ContactForm = () => {

return(
    <div className="form-message">
        <h2 className="heading">Leave a Message</h2>
        <form
            action="contact/contact-process4.php"
            method="post"
            id="commentform"
            className="comment-form"
        >
            <div className="fx flex-wrap">

                <fieldset className="name">
                    <input
                    type="text"
                    placeholder="Full Name Here"
                    required=""
                    name="name"
                    className="name"
                    id="name"
                    />
                </fieldset>

                <fieldset className="email">
                    <input
                    type="email"
                    placeholder="Email Address"
                    required=""
                    name="mail"
                    className="mail"
                    id="mail"
                    />
                </fieldset>

                <fieldset className="phone">
                    <input
                    type="number"
                    placeholder="Phone Number"
                    required=""
                    name="number"
                    className="number"
                    id="number"
                    />
                </fieldset>

                <fieldset className="select-wrap" role="group">
                    <div className="select">
                        <select name="subject" id="subject">
                            <option value="" disabled selected>
                                Subject
                            </option>
                            {subjectData.subjects.map((item, idx) => (
                                <option
                                key={idx} 
                                value={item.subject}>
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
                    tabIndex={4}
                    name="messagewr2"
                    className="messagewr2"
                    id="messagewr2"
                    defaultValue={""}
                    />
                </fieldset>

                <div className="wrap-btn">
                    <button type="submit" className="fl-btn st-6">
                        <span className="inner">Send message</span>
                    </button>
                </div>
            </div>
        </form>
    </div>
);

};

export default ContactForm;