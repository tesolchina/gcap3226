import React from "react";

interface Spring2026PageProps {
  pageTitle: string;
}

const Spring2026Page: React.FC<Spring2026PageProps> = ({ pageTitle }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-theme(spacing.14))] p-4">
      <h1 className="text-4xl font-bold text-primary mb-4">{pageTitle}</h1>
      <p className="text-lg text-muted-foreground">Content for {pageTitle} will go here.</p>
    </div>
  );
};

export default Spring2026Page;
