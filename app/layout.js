import "./globals.css";
export const metadata={
  title:"ProcureFlow by Sandeep Kumar Vattipally",
  description:"Indent to Receipt — Paperwork to Digital. Built by Sandeep Kumar Vattipally.",
  authors:[{name:"Sandeep Kumar Vattipally"}],
  creator:"Sandeep Kumar Vattipally",
  keywords:["procurement","SAP","indent","billing","Sandeep Kumar Vattipally"],
};
export default function RootLayout({children}){
  return(
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Syne:wght@400;600;800&display=swap" rel="stylesheet"/>
        <meta name="author" content="Sandeep Kumar Vattipally"/>
      </head>
      <body>{children}</body>
    </html>
  );
}
