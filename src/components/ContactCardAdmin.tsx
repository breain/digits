'use client';

import { Card, Image } from 'react-bootstrap';
import type { Contact as ContactInfo } from '@/lib/validationSchemas';

type AdminContact = ContactInfo & { owner: string };

const ContactCardAdmin = ({ contact }: { contact: AdminContact }) => (
  <Card className="h-100">
    <Card.Header>
      <Image src={contact.image} alt={`${contact.firstName} ${contact.lastName}`} width={75} />
      <Card.Title>
        {contact.firstName} {contact.lastName}
      </Card.Title>
      <Card.Subtitle>{contact.address}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>{contact.description}</Card.Text>
      <p className="blockquote-footer">{contact.owner}</p>
    </Card.Body>
  </Card>
);

export default ContactCardAdmin;
