export default function LearnLayout({
      children,
}: {
      children: React.ReactNode;
}) {
      return (
            <div className="h-screen bg-white">
                  {children}
            </div>
      );
}
