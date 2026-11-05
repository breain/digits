import { Col, Container, Row } from 'react-bootstrap';
// import StuffItemAdmin from '@/components/StuffItemAdmin';
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
  // const stuff = await prisma.stuff.findMany({});
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
  // const users = await prisma.user.findMany({});

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
            {/* <h1 className="mt-4">List Stuff Admin</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Condition</th>
                  <th>Owner</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {stuff.map((item) => (
                  <StuffItemAdmin key={item.id} {...item} />
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1>List Users Admin</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </Table> */}
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default AdminPage;
