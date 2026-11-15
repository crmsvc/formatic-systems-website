---
title: "Connect your platform"
description: "How a business that uses {{name}} connects your software through a remote MCP server, in five steps."
tier: public
section: developers
order: 1
status: testing
updated: 2026-11-15
answer_cards:
  - question: "How can my software work with {{name}}?"
    answer: "Offer what is called a remote MCP server, reachable over a secure web address. A business owner then adds it by pasting that address into the Marketplace page of their dashboard, and signs in on your page if you require it. No approval from Formatic is needed. Every tool arrives switched off, and the owner reviews each one before it can be used."
---

A business connects your platform by pasting the address of your remote MCP server into its dashboard. No approval from us is needed. Every tool arrives switched off, and the owner reviews and turns on each one.

## Two routes

- **A business adds your MCP server itself.** This needs nothing from us. The five steps are listed under "How a business connects your platform".
- **You ask us to list you in the Marketplace**, where an owner connects with one click. That is a later step: see [Marketplace listing](/docs/marketplace-listing).

## How a business connects your platform

There are five steps. The first is yours; the business owner does the other four in their dashboard.

### 1. Offer a remote MCP server

Publish your tools on a Model Context Protocol server that is reachable over HTTPS. There is nothing to install on our side and no SDK of ours to adopt: if your server works with other MCP clients, it is the right shape.

### 2. The business owner adds it by address

In their dashboard the owner opens Marketplace, chooses "Add your own MCP server" and pastes your server's address. No approval from us is needed for this step.

### 3. The owner signs in, if you ask for it

If your server requires OAuth, the owner is sent to your sign-in page and grants access there. Their password for your product is never typed into ours.

### 4. Every tool arrives switched off

Each tool your server offers shows up in the owner's list turned off and treated as a high-risk write, whatever it actually does. Nothing can call it yet.

### 5. The owner reviews each tool

The owner reads the name and description of each tool, turns on the ones they want, and can mark a tool as read-only or low risk. Tools left as high risk still work, but each use waits for the owner's approval.

What gets a tool switched on is covered in [Tools that are easy to approve](/docs/tool-guidelines).

## Who your tools act for

Tools added this way are used only on behalf of the owner and their team. They are never offered to a caller, a texter or a website visitor.

## Addresses

The product's own domain is not decided, so these pages give no addresses for it. Any exact addresses you need will be published here at launch.

> {{name}} is in development. Adding a server by address is built and being tested on sample data; no business is using it yet.
