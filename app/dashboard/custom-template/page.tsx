import dynamic from 'next/dynamic';

const EnhancedCustomTemplateGenerator = dynamic(
  () => import('@/components/EnhancedCustomTemplateGenerator'),
  { ssr: false }
);

export default function CustomTemplatePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* <h1 className="text-3xl font-bold mb-6">Custom Template Generator</h1> */}
      <EnhancedCustomTemplateGenerator />
    </div>
  );
}