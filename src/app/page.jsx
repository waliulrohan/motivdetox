"use client"
import { useQuery } from '@tanstack/react-query';


const fetchUser = async ()=> {
  const response = await fetch('/api');
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Network error');
  }
  return response.json();
};

export default function Home() {
  // Use the correct type parameters: data and error
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div>
      <h1 onClick={()=>refetch()} >new</h1>
      <p>{data.quote}</p>
    </div>
  );
}
