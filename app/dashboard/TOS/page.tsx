import Link from "next/link"

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-background">
      <main className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 text-acc">Terms of Service</h1>
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8">
          <nav className="bg-muted rounded-lg p-4 sticky top-4">
            <h2 className="text-lg font-medium mb-4">Table of Contents</h2>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}style={{ cursor: 'url(/poin.png), auto' }}>
                  User Responsibilities
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}style={{ cursor: 'url(/poin.png), auto' }}>
                  Intellectual Property
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}style={{ cursor: 'url(/poin.png), auto' }}>
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}style={{ cursor: 'url(/poin.png), auto' }}>
                  Dispute Resolution
                </Link>
              </li>
            </ul>
          </nav>
          <div className="space-y-8">
            <section id="user-responsibilities">
              <h2 className="text-2xl font-bold mb-4">User Responsibilities</h2>
              <p className="text-muted-foreground">
                As a user of our services, you are responsible for maintaining the security of your account and
                password. You agree to use our services only for lawful purposes and in accordance with these terms of
                service. You are responsible for your own content and activities on our platform.
              </p>
            </section>
            <section id="intellectual-property">
              <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
              <p className="text-muted-foreground">
                All content and intellectual property on our platform, including but not limited to text, graphics,
                logos, and software, are owned by Acme Inc. or its licensors. You may not modify, copy, distribute,
                transmit, display, reproduce, or create derivative works from our intellectual property without our
                prior written consent.
              </p>
            </section>
            <section id="privacy">
              <h2 className="text-2xl font-bold mb-4">Privacy</h2>
              <p className="text-muted-foreground">
                We take the privacy of our users seriously. We collect and use your personal information in accordance
                with our Privacy Policy. By using our services, you consent to the collection and use of your personal
                information as described in our Privacy Policy.
              </p>
            </section>
            <section id="dispute-resolution">
              <h2 className="text-2xl font-bold mb-4">Dispute Resolution</h2>
              <p className="text-muted-foreground">
                Any disputes arising out of or relating to these terms of service or your use of our services shall be
                resolved through binding arbitration in accordance with the rules of the American Arbitration
                Association. The arbitration shall be conducted in the English language and the award shall be final and
                binding on the parties.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}