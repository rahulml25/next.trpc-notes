import prisma from '@/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const notes = await prisma.note.findMany({});
  return NextResponse.json(notes);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const note = await prisma.note.create({
    data: body,
  });

  return NextResponse.json(note, {
    status: 200,
  });
}

export async function DELETE(request: NextRequest) {
  const body = await request.json();

  const note = await prisma.note.delete({
    where: { id: body.id }
  });

  return NextResponse.json(note, {
    status: 200,
  });
}
