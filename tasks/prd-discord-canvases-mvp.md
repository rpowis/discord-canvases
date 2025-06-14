# Product Requirements Document: Discord Canvases MVP

## Introduction/Overview

Discord Canvases is a collaborative document editor that allows Discord server members to create, share, and edit documents directly within Discord channels. The feature enables turn-based collaborative editing with basic rich text formatting, providing a lightweight solution for communities who want to collaborate on documents without leaving Discord.

**Problem Statement**: Discord communities currently lack a simple way to collaboratively create and edit documents within their workflow, forcing them to use external tools that break their communication flow.

**Goal**: Create a simple, Discord-native collaborative document editor that enables community members to create and edit shared documents seamlessly within their Discord channels.

## Goals

1. Enable any Discord server member to create new collaborative documents
2. Provide turn-based editing functionality to prevent conflicts
3. Support basic markdown formatting for document structure
4. Allow seamless sharing of documents within Discord channels
5. Maintain simple, intuitive user experience with minimal learning curve
6. Implement cost-effective storage solution for document persistence

## User Stories

1. **As a Discord server member**, I want to create a new canvas document in any channel so that I can start collaborative documentation.

2. **As a document creator**, I want to give my canvas a descriptive title so that others can easily identify its purpose.

3. **As a server member**, I want to edit an existing canvas when no one else is editing it so that I can contribute content.

4. **As an active editor**, I want to see that I have editing control and format text with basic markdown so that I can create structured content.

5. **As a server member**, I want to view canvases shared in channels so that I can read the collaborative content.

6. **As a server member**, I want to know when someone else is editing a canvas so that I don't interfere with their work.

## Functional Requirements

### Canvas Creation
1. Any server member must be able to create a new canvas in any channel they have access to
2. Canvas creation must require a title (minimum 3 characters, maximum 100 characters)
3. New canvases must start with empty content
4. Canvas must be immediately shared/displayed in the channel where it was created

### Editing System
5. Only one user must be able to edit a canvas at any given time
6. Users must be able to enter edit mode when no one else is editing
7. Edit sessions must automatically timeout after 10 minutes of inactivity
8. Users must be able to manually release edit control
9. Edit mode must provide a text input interface supporting basic markdown

### Content Formatting
10. Canvas content must support basic markdown formatting: **bold**, *italic*, headers (# ## ###), bullet points, numbered lists, and links
11. Canvas content must be limited to 10,000 characters maximum
12. Content must auto-save every 30 seconds during editing

### Display & Sharing
13. Canvases must be displayed as Discord embeds with title and preview content
14. Canvas embeds must show current edit status (available, being edited by [user])
15. Canvas embeds must include "Edit" button when available for editing
16. Canvas embeds must include "View Full" button to display complete content

### Access Control
17. All server members must have equal access to create and edit canvases
18. No additional permission system required for MVP

## Non-Goals (Out of Scope)

- Advanced permissions or role-based access control
- Real-time collaborative editing (multiple simultaneous editors)
- Slash command interface (buttons/UI only)
- Advanced text formatting (colors, fonts, images)
- Version history or document revisions
- Document templates
- Cross-server canvas sharing
- File attachments or multimedia content
- Advanced markdown features (tables, code blocks, etc.)

## Design Considerations

### User Interface
- Use Discord's native button components for interaction
- Leverage Discord embeds for canvas display
- Editing interface should be a modal or dedicated text input
- Clear visual indicators for edit status

### User Experience Flow
1. User clicks "Create Canvas" button → Modal opens for title input
2. User submits title → Canvas created and displayed in channel
3. User clicks "Edit" button → Edit modal opens with current content
4. User edits content → Auto-save every 30 seconds
5. User clicks "Save & Close" or times out → Edit session ends

## Technical Considerations

### Storage Solution
- **Recommended**: Simple JSON file storage or lightweight database (SQLite)
- **Alternative**: Cloud storage (AWS S3, Google Cloud) for scalability
- Documents should be stored with: ID, title, content, channel_id, server_id, created_by, last_edited_by, last_edited_time

### Discord Integration
- Use Discord.py or discord.js for bot framework
- Implement button interactions for canvas management
- Use Discord embeds for canvas display
- Store Discord user IDs for edit tracking

### Authentication & User Tracking
- Use Discord's built-in user authentication through bot interactions
- Track active edit sessions with user ID and timestamp
- No additional authentication system needed

### Data Limits
- Maximum 10,000 characters per canvas (based on Discord embed limits and performance)
- No limit on number of canvases per server initially
- Consider implementing server-based limits if storage becomes concern

## Success Metrics

### Primary Success Criteria
1. **Functional Success**: Both project maintainers can successfully create, edit, and share canvases
2. **Usability Success**: Creating and editing a canvas takes less than 30 seconds to learn
3. **Reliability Success**: Edit conflicts are prevented 100% of the time through turn-based system

### Technical Success Criteria
1. **Performance**: Canvas creation and edit mode activation under 2 seconds
2. **Data Integrity**: No data loss during edit sessions or timeouts
3. **Uptime**: Bot maintains 99%+ uptime during development testing

## Open Questions

1. **Storage Implementation**: Should we start with local file storage or implement cloud storage from the beginning?

2. **Edit Timeout Handling**: Should we warn users before their edit session expires (e.g., "2 minutes remaining")?

3. **Content Preview**: How much content should be shown in the channel embed preview? (first 200 characters?)

4. **Error Handling**: How should the system handle Discord API failures during save operations?

5. **Canvas Discovery**: Do we need a way to list all canvases in a server, or is channel-based discovery sufficient?

## Implementation Priority

### Phase 1 (Core MVP)
- Canvas creation with title input
- Basic embed display in channels
- Turn-based editing with simple text input
- Local storage implementation

### Phase 2 (Enhancement)
- Markdown formatting support
- Auto-save functionality
- Edit timeout system
- Improved UI/UX

### Phase 3 (Polish)
- Error handling and edge cases
- Performance optimization
- User feedback integration 