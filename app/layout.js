import "./globals.css";
export const metadata={title:"ProcureFlow",description:"Indent to Receipt"};
export default function RootLayout({children}){
  return(
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Syne:wght@400;600;800&display=swap" rel="stylesheet"/>
      </head>
      <body>{children}</body>
    </html>
  );
}
