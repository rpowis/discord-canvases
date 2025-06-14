# Discord Canvases - Product Requirements Document

## 1. Overview

### Purpose
Create a simplified collaborative document editor for Discord that allows server members to create, share, and collaboratively edit documents within Discord channels.

### Vision
Enable Discord communities to maintain shared knowledge, meeting notes, project documentation, and collaborative content without leaving Discord or requiring external tools.

### Target Users
- Discord server administrators and moderators
- Community organizers
- Study groups and project teams
- Gaming communities that need shared documentation

## 2. Core Features

### 2.1 Document Creation
- **Create New Document**: Users can create a new document via slash command
- **Title and Description**: Each document has a title and optional description
- **Rich Text Editing**: Basic formatting (bold, italic, headers, lists, links)

### 2.2 Document Sharing
- **Channel Integration**: Documents can be shared to specific Discord channels
- **Permalink Generation**: Each document gets a shareable link within Discord
- **Channel Notifications**: Notify channel when document is created/updated


### 2.3 Collaborative Editing
- **Turn-Based Editing**: Only one user can edit at a time (document locking)
- **Edit Sessions**: Clear indication of who is currently editing
- **Edit Queue**: Users can request to edit when document is locked
- **Auto-Save**: Changes are saved automatically during editing


### 2.4 Document Management
- **Document List**: View all documents shared in a channel
- **Search**: Basic search functionality within documents
- **Archive/Delete**: Ability to archive or delete documents (with proper permissions)

## 3. User Stories

### As a Discord Server Member, I want to:
- Create a document with `/canvas create "Meeting Notes"` so I can start taking notes
- Edit a document by clicking an "Edit" button so I can add my contributions
- See who is currently editing a document so I know when I can make changes
- View all documents shared in my channel so I can find relevant information
- Get notified when someone updates a shared document so I stay informed

### As a Discord Server Admin, I want to:
- Control who can create documents in my server
- Archive or delete inappropriate documents
- See document activity to understand engagement

### As a Community Organizer, I want to:
- Create meeting agenda templates that can be reused
- Share project documentation that everyone can contribute to
- Maintain a FAQ document that team members can update

## 4. Technical Requirements

### 4.1 Discord Integration
- **Discord Activity**: Built as a Discord Embedded App/Activity
- **Slash Commands**: `/canvas` command family for document management
- **OAuth Integration**: Authenticate users via Discord

- **User Identification**: Use Discord user IDs and display names

### 4.2 Core Architecture
- **Frontend**: Web-based interface running in Discord's iframe
- **Backend**: REST API with WebSocket support for real-time status
- **Database**: SQLite for simplicity (can upgrade to PostgreSQL later)
- **File Storage**: Local storage initially
- **Authentication**: Discord OAuth2

### 4.3 Data Models

#### Document
```
- id (UUID)
- title (string)
- content (text/markdown)
- channel_id (Discord channel ID)
- created_by (Discord user ID)
- created_at (timestamp)
- updated_at (timestamp)
- is_locked (boolean)
- locked_by (Discord user ID, nullable)
- locked_at (timestamp, nullable)
```



### 4.4 Performance Requirements
- Document loading: < 2 seconds
- Edit lock acquisition: < 1 second
- Auto-save interval: Every 30 seconds
- Support up to 50 concurrent documents per server
- Handle documents up to 10,000 characters

## 5. User Experience Flow

### Creating a Document
1. User types `/canvas create "Document Title"`
2. Discord opens Canvas Activity
3. Document is created and shared to channel
4. Channel receives notification with document link

### Editing a Document
1. User clicks "Edit" button on document
2. System checks if document is locked
3. If available, user gets edit access and document locks
4. User makes changes in rich text editor
5. Changes auto-save every 30 seconds
6. User clicks "Done" to release lock
7. Channel gets update notification



## 6. Success Metrics

### Primary Metrics
- **Adoption Rate**: Number of servers using the app
- **Document Creation**: Average documents created per server per week
- **Collaboration Rate**: Average number of editors per document
- **Retention**: Percentage of servers still using after 30 days

### Secondary Metrics
- **Edit Session Duration**: Average time users spend editing
- **Document Engagement**: Views to edits ratio
- **User Retention**: How often users return to edit documents

## 7. Non-Goals (v1)

- Real-time collaborative editing (like Google Docs)
- Advanced formatting (images, tables, complex layouts)
- Document versioning with branching/merging
- Integration with external services
- Mobile-optimized editing experience
- Advanced permission systems beyond Discord roles

## 8. Future Considerations (v2+)

### Phase 2 Features
- Real-time collaborative editing
- Image and file attachments
- Document templates (blank, meeting notes, project outline)
- Integration with common bots (Carl-bot, MEE6)
- Export functionality (PDF, Markdown)

### Phase 3 Features
- Advanced formatting and layouts
- Document workflows and approval processes
- Analytics and insights
- API for third-party integrations
- Mobile app optimization

## 9. Technical Constraints

- Must work within Discord's Activity iframe limitations
- Cannot store sensitive data (follows Discord's data policies)
- Must handle Discord API rate limits
- Should work across Discord's supported platforms (desktop, web, mobile)
- Must comply with Discord's Terms of Service and Developer Policy

## 10. Risk Assessment

### High Risk
- **Discord Policy Changes**: Discord could change Activity policies
- **User Adoption**: Users might prefer external tools

### Medium Risk
- **Performance Issues**: Large documents or many concurrent users
- **Data Loss**: Need robust backup and recovery

### Low Risk
- **Competition**: Other Discord apps with similar features
- **Technical Complexity**: Well-understood technologies

## 11. Launch Strategy

### MVP (Minimum Viable Product)
- Basic document creation and editing
- Turn-based collaborative editing
- Simple slash command integration
- Share to channel functionality

### Beta Testing
- Test with 5-10 friendly Discord communities
- Gather feedback on core workflows
- Iterate on user experience

### Public Launch
- Submit to Discord App Directory
- Create documentation and tutorials
- Community outreach and marketing 
