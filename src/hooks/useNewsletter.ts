import { useState } from 'react';
import { toast } from 'react-hot-toast';

type NewsletterResponse = {
  status: 'success' | 'error';
  message: string;
};

export function useNewsletter() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    hp: '', // Honeypot field
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('https://mail.cgsys.net/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          name: formData.name,
          email: formData.email,
          hp: formData.hp,
          list: 'e0UArtdvhTxdqOvp8CDpaQ',
          subform: 'yes',
        }),
      });

      const data = await response.text();
      
      // Parse the response text to determine the status
      let status: NewsletterResponse['status'] = 'error';
      let message = 'Something went wrong. Please try again.';

      if (data.includes("You're subscribed")) {
        status = 'success';
        message = 'Successfully subscribed to our newsletter!';
      } else if (data.toLowerCase().includes('already')) {
        message = 'You are already subscribed to our newsletter!';
      } else if (data.toLowerCase().includes('pending')) {
        message = 'Your subscription is pending. Please check your email to confirm.';
      } else if (data.toLowerCase().includes('invalid')) {
        message = 'Please enter a valid email address.';
      }

      if (status === 'success') {
        toast.success(message);
        setFormData({ name: '', email: '', hp: '' });
      } else {
        toast.error(message);
      }
    } catch {
      toast.error('Failed to connect to the server. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return {
    isLoading,
    formData,
    handleSubmit,
    handleChange,
  };
} 