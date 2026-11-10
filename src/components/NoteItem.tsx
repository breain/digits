import { ListGroup } from 'react-bootstrap';
import type { Note } from '@/lib/validationSchemas';

const NoteItem = ({ note }: { note: Note }) => (
  <ListGroup.Item className="border-0 px-4 py-2">
    <p className="fw-lighter mb-2">{note.createdAt.toLocaleDateString('en-US')}</p>
    <p className="mb-0">{note.note}</p>
  </ListGroup.Item>
);

export default NoteItem;
