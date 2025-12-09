import * as React from 'react';

export   interface EmailTemplateProps {
   name: string;
  email: string;
  phone: string;
  zipCode: string;
  location: string;
  timing: string;
  projectDetails: string;
}

export default function EmailTemplate({ name, email, phone, zipCode, location, timing, projectDetails }: EmailTemplateProps) {
  return (
      <div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.5" }}>
      <h2>Denver Locksmith</h2>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Phone:</strong> {phone}</p>
      <p><strong>Zip Code:</strong> {zipCode}</p>
      <p><strong>Location:</strong> {location}</p>
      <p><strong>Timing:</strong> {timing}</p>
      <p><strong>Project Details:</strong> {projectDetails}</p>
    </div>
  );
}