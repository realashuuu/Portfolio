# UnQue Lead PoC — Meta Lead Ads Event-Driven Integration

- Status: Completed Proof of Concept
- Repository: https://github.com/realashuuu/Unque-Lead-PoC
- Author: Ashik Khan
- Stack: Node.js, Express.js, TypeScript, MongoDB, Mongoose, Socket.IO, React Native, Meta Graph API, Meta Webhooks.

## Overview
An automated event-driven integration pipeline that receives Meta Lead Ads webhooks, verifies SHA-256 signatures, queries the Meta Graph API for decrypted field parameters, prevents duplicate storage in MongoDB, and streams real-time lead notices to a React Native mobile dashboard in under 2 seconds.

## Architecture
Meta Lead Ads Form → Meta Webhook Dispatch → Node.js Express Receiver → Meta Graph API Query → MongoDB Compound Unique Deduplication → Socket.IO Real-Time Stream → React Native Mobile Dashboard.
