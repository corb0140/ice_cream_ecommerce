import { useState } from "react";
import { Mail, Phone } from "lucide-react";
import FormInputs from "../components/FormComponent";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Message submitted:", formData);
    // Replace this with actual API call
    alert("Thank you for contacting us!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen overflow-hidden px-4 py-2 lg:pt-20 bg-early-dawn text-white ">
      <div className=" flex flex-col items-center justify-center relative top-[80px] h-[calc(100%-80px)]">
        <h1 className="text-3xl font-bold mb-5 text-center">Contact Us</h1>

        <div className="w-full max-w-4xl flex flex-col gap-12">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInputs
              name="name"
              type="text"
              value={formData.name}
              setValue={(value) => setFormData({ ...formData, name: value })}
              isRequired={true}
            />

            <FormInputs
              name="email"
              type="email"
              value={formData.email}
              setValue={(value) => setFormData({ ...formData, email: value })}
              isRequired={true}
            />

            <FormInputs
              name="message"
              type="textarea"
              value={formData.message}
              setValue={(value) => setFormData({ ...formData, message: value })}
              isRequired={true}
            />

            <button
              type="submit"
              className="bg-wewak text-livid-brown font-semibold px-6 py-2 rounded-full hover:bg-candle-light transition"
            >
              Send Message
            </button>
          </form>

          {/* Contact Information */}
          <div className="space-y-5 mb-20">
            <div className="flex items-start gap-4">
              <Mail className="mt-1" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p>support@sweettooth.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="mt-1" />
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p>+1 (123) 456-7890</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
