'use client';

import { Card, Image } from 'react-bootstrap';
import Link from 'next/link';
import type { Contact as ContactInfo } from '@/lib/validationSchemas';

const Contact = ({ contact }: { contact: ContactInfo }) => (
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
    </Card.Body>
    <Card.Footer>
      <Link href={`/edit/contact/${contact.id}`}>Edit</Link>
    </Card.Footer>
  </Card>
);

export default Contact;
