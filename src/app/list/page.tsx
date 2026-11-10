import { Col, Container, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { auth } from '@/lib/auth';
import Contact from '@/components/ContactCard';
import type { Contact as ContactInfo, Note } from '@/lib/validationSchemas';

/** Render the contacts page for the logged in user. */
const ListPage = async () => {
  // Protect the page, only logged in users can access it.
  const session = await auth();
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; name: string };
    } | null,
  );
  const owner = session?.user?.email || '';
  const contacts = await prisma.$queryRaw<ContactInfo[]>`
    SELECT "id", "firstName", "lastName", "address", "image", "description"
    FROM "Contact"
    WHERE "owner" = ${owner}
  `;
  const notes = await prisma.$queryRaw<Note[]>`
    SELECT "id", "contactId", "note", "owner", "createdAt"
    FROM "Note"
    WHERE "owner" = ${owner}
  `;
  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
            <h2 className="text-center">List Contacts</h2>
            <Row xs={1} md={2} lg={3} className="g-4">
              {contacts.map((item) => (
                <Col key={`Contact-${item.firstName}`}>
                  <Contact contact={item} notes={notes.filter((note) => note.contactId === item.id)} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ListPage;
