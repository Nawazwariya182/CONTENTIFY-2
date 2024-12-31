import dynamic from 'next/dynamic';

const EnhancedVoiceAIContentGenerator = dynamic(
  () => import('@/components/EnhancedVoiceAIContentGenerator'),
  { ssr: false }
);

export default function VoicePage() {
  return (
    <div>
      <EnhancedVoiceAIContentGenerator />
    </div>
  );
}