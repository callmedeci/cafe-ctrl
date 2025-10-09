import { Viewport } from 'next';
import { notFound } from 'next/navigation';

export const viewport: Viewport = {
  themeColor: '#000000',
};

function CatchAllPage() {
  notFound();
}

export default CatchAllPage;
