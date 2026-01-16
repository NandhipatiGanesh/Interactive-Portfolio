"use client";

import React from "react";

export function FontPreviewTable() {
  const sampleTexts = [
    "The quick brown fox jumps over the lazy dog.",
    "Pack my box with five dozen liquor jugs.",
    "Sphinx of black quartz, judge my vow.",
    "Amazingly few discotheques provide jukeboxes.",
  ];

  const typographySamples = [
    { label: "Display 1 (H1)", element: <h1 className="text-6xl font-bold" style={{ fontFamily: 'Circular' }}>Heading Level 1</h1>, desc: "Used for main page titles" },
    { label: "Display 2 (H2)", element: <h2 className="text-5xl font-semibold" style={{ fontFamily: 'Circular' }}>Heading Level 2</h2>, desc: "Used for section headings" },
    { label: "Display 3 (H3)", element: <h3 className="text-4xl font-medium" style={{ fontFamily: 'Circular' }}>Heading Level 3</h3>, desc: "Used for card titles" },
    { label: "Display 4 (H4)", element: <h4 className="text-3xl font-medium" style={{ fontFamily: 'Circular' }}>Heading Level 4</h4>, desc: "Used for subtitles" },
    { label: "Body Text (P)", element: <p className="text-lg leading-relaxed text-muted-foreground" style={{ fontFamily: 'Circular' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>, desc: "Standard body copy" },
    { label: "Small Text", element: <p className="text-sm text-muted-foreground/80" style={{ fontFamily: 'Circular' }}>This is smaller text often used for captions, metadata, or helper text.</p>, desc: "Captions and helpers" },
  ];

  return (
    <section className="py-24 px-4 md:px-8 bg-secondary/30" style={{ fontFamily: 'Circular' }}>
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ fontFamily: 'Circular' }}>Typography System</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" style={{ fontFamily: 'Circular' }}>
            A comprehensive preview of our font hierarchy and typographic styles used across the application.
          </p>
        </div>

        <div className="rounded-xl border bg-card/50 backdrop-blur-sm shadow-sm overflow-hidden">
          <div className="grid grid-cols-12 border-b bg-muted/50 p-4 font-medium text-muted-foreground text-sm uppercase tracking-wider">
            <div className="col-span-3 md:col-span-2">Element</div>
            <div className="col-span-9 md:col-span-7">Preview</div>
            <div className="hidden md:block md:col-span-3 text-right">Usage</div>
          </div>
          
          <div className="divide-y">
            {typographySamples.map((item, idx) => (
              <div key={idx} className="grid grid-cols-12 items-center p-6 md:p-8 hover:bg-muted/10 transition-colors">
                <div className="col-span-3 md:col-span-2 text-xs text-muted-foreground uppercase tracking-wide">
                  {item.label}
                </div>
                <div className="col-span-9 md:col-span-7 pr-4">
                  {item.element}
                </div>
                <div className="hidden md:block md:col-span-3 text-right text-sm text-muted-foreground italic">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-xl border bg-card/50 backdrop-blur-sm shadow-sm space-y-6">
                <h3 className="text-2xl font-bold" style={{ fontFamily: 'Circular' }}>Paragraph Preview</h3>
                <div className="space-y-4 text-muted-foreground">
                    <p style={{ fontFamily: 'Circular' }}>
                        In a world where typography matters, the choice of font can define the entire user experience. 
                        Good design is obvious. Great design is transparent. 
                        It communicates without noise.
                    </p>
                    <p style={{ fontFamily: 'Circular' }}>
                        We strive for clarity and impact. Our heading fonts command attention with their weight and character, 
                        while our body fonts ensure readability and comfort for long-form content.
                    </p>
                </div>
            </div>
             <div className="p-8 rounded-xl border bg-card/50 backdrop-blur-sm shadow-sm space-y-6">
                <h3 className="text-2xl font-bold" style={{ fontFamily: 'Circular' }}>Character Map</h3>
                <div className="grid grid-cols-1 gap-2">
                    {sampleTexts.map((text, i) => (
                         <div key={i} className="p-3 bg-background rounded border text-lg">
                             {text}
                         </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
