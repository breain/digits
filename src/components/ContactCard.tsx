'use client';

import { Card, Image, ListGroup } from 'react-bootstrap';
import Link from 'next/link';
import AddNoteForm from '@/components/AddNoteForm';
import NoteItem from '@/components/NoteItem';
import type { Contact as ContactInfo, Note } from '@/lib/validationSchemas';

const Contact = ({ contact, notes }: { contact: ContactInfo; notes: Note[] }) => (
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
        <ListGroup variant="flush">
        {notes.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </ListGroup>
      <AddNoteForm contactId={contact.id} />
    </Card.Body>
    <Card.Footer>
      <Link href={`/edit/contact/${contact.id}`}>Edit</Link>
    </Card.Footer>
  </Card>
);

export default Contact;
