// Remove PageProps interface, since props aren't passed in this manner for Next.js pages

import AIContentGenerator from './AIContentGenerator'

// The page does not need to handle props directly here
export default function Page() {
  return <AIContentGenerator />;
}