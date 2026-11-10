import { Col, Container, Row } from 'react-bootstrap';
import ContactCardAdmin from '@/components/ContactCardAdmin';
import { prisma } from '@/lib/prisma';
import { adminProtectedPage } from '@/lib/page-protection';
import { auth } from '@/lib/auth';
import type { Note } from '@/lib/validationSchemas';

const AdminPage = async () => {
  const session = await auth();
  adminProtectedPage(
    session as {
      user: { email: string; id: string; name: string };
    } | null,
  );
  const contacts = await prisma.$queryRaw<Array<{
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    image: string;
    description: string;
    owner: string;
  }>>`
    SELECT "id", "firstName", "lastName", "address", "image", "description", "owner"
    FROM "Contact"
  `;
  const notes = await prisma.$queryRaw<Note[]>`
    SELECT "id", "contactId", "note", "owner", "createdAt"
    FROM "Note"
  `;
  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
            <h1 className="text-center">List Contacts (Admin)</h1>
            <Row xs={1} md={2} lg={3} className="g-4">
              {contacts.map((contact) => (
                <Col key={`Contact-${contact.id}`}>
                  <ContactCardAdmin
                    contact={contact}
                    notes={notes.filter((note) => note.contactId === contact.id)}
                  />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default AdminPage;
