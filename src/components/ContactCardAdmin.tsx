'use client';

import { Card, Image, ListGroup } from 'react-bootstrap';
import NoteItem from '@/components/NoteItem';
import type { Contact as ContactInfo, Note } from '@/lib/validationSchemas';

type AdminContact = ContactInfo & { owner: string };

const ContactCardAdmin = ({ contact, notes }: { contact: AdminContact; notes: Note[] }) => (
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
    <ListGroup variant="flush">
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
    </ListGroup>
  </Card>
);

export default ContactCardAdmin;
