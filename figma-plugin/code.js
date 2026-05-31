// Figma Plugin - Landing Page Generator - TESTED VERSION

// UI HTML
var uiHtml = '<html><body style="font-family:sans-serif;padding:16px;background:#1a1a2e;color:#fff"><h3 style="margin:0 0 8px">Landing Page</h3><input id="name" value="My App" style="width:100%;padding:8px;margin:8px 0;background:#0f0f0f;border:1px solid #333;color:#fff;border-radius:4px"><input id="color" value="#6366F1" style="width:100%;padding:8px;margin:8px 0;background:#0f0f0f;border:1px solid #333;color:#fff;border-radius:4px"><button style="width:100%;padding:10px;background:#6366f1;color:#fff;border:none;border-radius:4px;cursor:pointer" onclick="parent.postMessage({pluginMessage:{name:document.getElementById(\'name\').value,color:document.getElementById(\'color\').value}}, \'*\')">Generate</button></body></html>';

figma.showUI(uiHtml, { width: 220, height: 240 });

// Handle messages from UI
figma.ui.onmessage = function(message) {
  if (message.name) {
    runGenerator(message.name, message.color);
  }
};

// Main generator function
function runGenerator(appName, accentColor) {
  // Create new page
  var newPage = figma.createPage();
  newPage.name = "Landing Page - " + appName;
  
  // Set this page as current (using figma.currentPage assignment is NOT allowed)
  // Instead we append our frame to the existing page and create a new page
  
  // Create main frame on the new page
  var frame = figma.createFrame();
  frame.name = "Main";
  frame.x = 0;
  frame.y = 0;
  frame.width = 1440;
  frame.height = 2000;
  frame.fills = [{ type: "SOLID", color: { r: 0.06, g: 0.06, b: 0.08 } }];
  newPage.appendChild(frame);
  
  // Parse color
  var accent = parseColor(accentColor);
  
  // Header bar
  var header = figma.createRectangle();
  header.name = "Header";
  header.x = 0;
  header.y = 0;
  header.width = 1440;
  header.height = 72;
  header.fills = [{ type: "SOLID", color: { r: 0, g: 0, b: 0, opacity: 0.5 } }];
  frame.appendChild(header);
  
  // Logo text
  var logo = figma.createText();
  logo.characters = appName;
  logo.fontSize = 24;
  logo.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  logo.x = 60;
  logo.y = 24;
  frame.appendChild(logo);
  
  // Nav text  
  var nav = figma.createText();
  nav.characters = "Product  Solutions  Pricing  About";
  nav.fontSize = 14;
  nav.fills = [{ type: "SOLID", color: { r: 0.7, g: 0.7, b: 0.7 } }];
  nav.x = 500;
  nav.y = 28;
  frame.appendChild(nav);
  
  // CTA Button
  var ctaBtn = figma.createRectangle();
  ctaBtn.x = 1160;
  ctaBtn.y = 16;
  ctaBtn.width = 140;
  ctaBtn.height = 40;
  ctaBtn.cornerRadius = 8;
  ctaBtn.fills = [{ type: "SOLID", color: accent }];
  frame.appendChild(ctaBtn);
  
  var ctaTxt = figma.createText();
  ctaTxt.characters = "Get Started";
  ctaTxt.fontSize = 14;
  ctaTxt.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  ctaTxt.x = 1190;
  ctaTxt.y = 26;
  frame.appendChild(ctaTxt);
  
  // Hero
  var hero = figma.createText();
  hero.characters = "Build something amazing today";
  hero.fontSize = 56;
  hero.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  hero.x = 60;
  hero.y = 120;
  frame.appendChild(hero);
  
  // Subtitle
  var sub = figma.createText();
  sub.characters = "The all-in-one platform that helps teams work smarter.";
  sub.fontSize = 18;
  sub.fills = [{ type: "SOLID", color: { r: 0.6, g: 0.65, b: 0.7 } }];
  sub.x = 60;
  sub.y = 200;
  frame.appendChild(sub);
  
  // Primary button
  var btn1 = figma.createRectangle();
  btn1.x = 60;
  btn1.y = 300;
  btn1.width = 160;
  btn1.height = 48;
  btn1.cornerRadius = 10;
  btn1.fills = [{ type: "SOLID", color: accent }];
  frame.appendChild(btn1);
  
  var btn1t = figma.createText();
  btn1t.characters = "Start Free Trial";
  btn1t.fontSize = 15;
  btn1t.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  btn1t.x = 80;
  btn1t.y = 313;
  frame.appendChild(btn1t);
  
  // Secondary button
  var btn2 = figma.createRectangle();
  btn2.x = 240;
  btn2.y = 300;
  btn2.width = 140;
  btn2.height = 48;
  btn2.cornerRadius = 10;
  btn2.fills = [{ type: "SOLID", color: { r: 0.12, g: 0.12, b: 0.16 } }];
  frame.appendChild(btn2);
  
  var btn2t = figma.createText();
  btn2t.characters = "Watch Demo";
  btn2t.fontSize = 15;
  btn2t.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  btn2t.x = 265;
  btn2t.y = 313;
  frame.appendChild(btn2t);
  
  // Features title
  var featT = figma.createText();
  featT.characters = "Everything you need";
  featT.fontSize = 40;
  featT.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  featT.x = 60;
  featT.y = 420;
  frame.appendChild(featT);
  
  // Feature cards (simple loop)
  var featData = [
    { t: "Lightning Fast", d: "Optimized performance" },
    { t: "Enterprise Security", d: "SOC2 compliant" },
    { t: "Advanced Analytics", d: "Real-time insights" },
    { t: "Global Scale", d: "35+ regions worldwide" }
  ];
  
  var card0 = figma.createRectangle();
  card0.x = 60;
  card0.y = 500;
  card0.width = 660;
  card0.height = 140;
  card0.cornerRadius = 12;
  card0.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.1, b: 0.14 } }];
  frame.appendChild(card0);
  
  var ct0 = figma.createText();
  ct0.characters = featData[0].t;
  ct0.fontSize = 18;
  ct0.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  ct0.x = 84;
  ct0.y = 520;
  frame.appendChild(ct0);
  
  var cd0 = figma.createText();
  cd0.characters = featData[0].d;
  cd0.fontSize = 14;
  cd0.fills = [{ type: "SOLID", color: { r: 0.6, g: 0.65, b: 0.7 } }];
  cd0.x = 84;
  cd0.y = 550;
  frame.appendChild(cd0);
  
  // Second feature card
  var card1 = figma.createRectangle();
  card1.x = 750;
  card1.y = 500;
  card1.width = 660;
  card1.height = 140;
  card1.cornerRadius = 12;
  card1.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.1, b: 0.14 } }];
  frame.appendChild(card1);
  
  var ct1 = figma.createText();
  ct1.characters = featData[1].t;
  ct1.fontSize = 18;
  ct1.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  ct1.x = 774;
  ct1.y = 520;
  frame.appendChild(ct1);
  
  // Pricing title
  var priceT = figma.createText();
  priceT.characters = "Simple pricing";
  priceT.fontSize = 40;
  priceT.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  priceT.x = 60;
  priceT.y = 900;
  frame.appendChild(priceT);
  
  // Pricing cards
  var pc1 = figma.createRectangle();
  pc1.x = 60;
  pc1.y = 980;
  pc1.width = 413;
  pc1.height = 280;
  pc1.cornerRadius = 16;
  pc1.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.1, b: 0.14 } }];
  frame.appendChild(pc1);
  
  var p1t = figma.createText();
  p1t.characters = "Starter";
  p1t.fontSize = 22;
  p1t.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  p1t.x = 92;
  p1t.y = 1012;
  frame.appendChild(p1t);
  
  var p1p = figma.createText();
  p1p.characters = "$0";
  p1p.fontSize = 36;
  p1p.fills = [{ type: "SOLID", color: accent }];
  p1p.x = 92;
  p1p.y = 1050;
  frame.appendChild(p1p);
  
  // Pro card (highlighted)
  var pc2 = figma.createRectangle();
  pc2.x = 513;
  pc2.y = 980;
  pc2.width = 413;
  pc2.height = 280;
  pc2.cornerRadius = 16;
  pc2.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.1, b: 0.14 } }];
  pc2.strokes = [{ type: "SOLID", color: accent }];
  pc2.strokeWeight = 2;
  frame.appendChild(pc2);
  
  var p2t = figma.createText();
  p2t.characters = "Pro";
  p2t.fontSize = 22;
  p2t.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  p2t.x = 545;
  p2t.y = 1012;
  frame.appendChild(p2t);
  
  var p2p = figma.createText();
  p2p.characters = "$29";
  p2p.fontSize = 36;
  p2p.fills = [{ type: "SOLID", color: accent }];
  p2p.x = 545;
  p2p.y = 1050;
  frame.appendChild(p2p);
  
  // Footer
  var footer = figma.createRectangle();
  footer.x = 0;
  footer.y = 1400;
  footer.width = 1440;
  footer.height = 150;
  footer.fills = [{ type: "SOLID", color: { r: 0.05, g: 0.05, b: 0.06 } }];
  frame.appendChild(footer);
  
  var ftxt = figma.createText();
  ftxt.characters = "© 2026 " + appName + ". All rights reserved.";
  ftxt.fontSize = 14;
  ftxt.fills = [{ type: "SOLID", color: { r: 0.4, g: 0.4, b: 0.45 } }];
  ftxt.x = 60;
  ftxt.y = 1470;
  frame.appendChild(ftxt);
  
  // Notify success
  figma.notify("Landing page created: " + appName, { type: "success" });
}

// Helper function to parse hex color
function parseColor(hex) {
  var cleanHex = hex.replace("#", "");
  var r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  var g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  var b = parseInt(cleanHex.substring(4, 6), 16) / 255;
  return { r: r, g: g, b: b };
}
