import { redirect } from 'next/navigation';

export default function FavoritesPage() {
  // Redirect to the main account page which shows the favorites
  redirect('/account');
}
