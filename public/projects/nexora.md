# Nexora — AI Meeting Intelligence Platform

- Status: In Progress
- Repository: https://github.com/realashuuu/nexora
- Author: Ashik Khan
- Stack: Next.js 14, TypeScript, Node.js, PostgreSQL (Neon Serverless), Drizzle ORM, OpenAI API, tRPC, Redis, Stream Video SDK.

## Overview
Nexora transforms unstructured audio meetings into actionable, searchable engineering intelligence through automated transcription, executive summarization, decision extraction, and prioritized task synthesis.

## Problem
Meeting conversations frequently suffer from post-call context loss, unassigned action items, and manual note-taking overhead that delays engineering velocity.

## Architecture
Stream Video SDK → Audio Stream Chunking → Whisper Transcription Pipeline → OpenAI Structured JSON Extraction → Drizzle ORM Relational Mapping → Neon Serverless PostgreSQL → tRPC Client Sync.

## Status
Under active development.
