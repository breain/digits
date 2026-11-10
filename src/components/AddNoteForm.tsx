'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { redirect } from 'next/navigation';
import { addNote } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddNoteSchema } from '@/lib/validationSchemas';
import type { InferType } from 'yup';

type AddNoteData = InferType<typeof AddNoteSchema>;

const onSubmit = async (data: AddNoteData) => {
  await addNote(data);
};

const AddNoteForm = ({ contactId }: { contactId: number }) => {
  const { data: session, status } = useSession();
  const currentUser = session?.user?.email || '';
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddNoteData>({
    resolver: yupResolver(AddNoteSchema),
  });

  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  return (
    <Card className="mx-3 mb-3">
      <Card.Header className="text-center py-2">Add Timestamped Note</Card.Header>
      <Card.Body className="p-2">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Label>Note</Form.Label>
            <Form.Control
              type="text"
              {...register('note')}
              className={errors.note ? 'is-invalid' : ''}
            />
            <div className="invalid-feedback">{errors.note?.message}</div>
          </Form.Group>
          <input type="hidden" {...register('owner')} value={currentUser} />
          <input type="hidden" {...register('contactId')} value={contactId} />
          <Row className="pt-2">
            <Col>
              <Button type="submit" variant="primary">
                Submit
              </Button>
            </Col>
            <Col className="text-center">
              <Button type="button" onClick={() => reset()} variant="warning">
                Reset
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddNoteForm;
