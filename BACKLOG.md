# Discord Canvases - Feature Backlog

This file captures features, ideas, and improvements that are not part of the initial v1 release but may be considered for future versions.

## Deferred from v1

### Document Templates
**Why deferred**: Adds complexity to MVP, users can create their own templates organically

### Edit History & Version Tracking
**Why deferred**: Adds significant database and UI complexity to MVP
- Show who made changes and when
- Browse previous versions of documents
- Compare differences between versions
- Restore previous versions
- Basic audit trail for document changes

### Discord Permission Inheritance
**Why deferred**: Complex permission system integration, can start with basic sharing
- Inherit view/edit permissions from Discord channel permissions
- Check user roles and channel overrides
- Handle permission changes dynamically
- Support for DMs vs server channels
- Advanced access control (view vs edit vs manage permissions)
- Blank document template
- Meeting notes template  
- Project outline template
- FAQ template
- Community guidelines template
- Template marketplace/sharing between servers

**Future considerations:**
- Server-specific custom templates
- Community-contributed template library
- Template variables/placeholders
- Template categories and tags

## Phase 2 Candidates

### Enhanced Collaboration
- **Real-time collaborative editing** (Google Docs style)
  - Cursor indicators showing where others are typing
  - Live character-by-character updates
  - Conflict resolution for simultaneous edits
  - User avatars in document

### Rich Content & Media
- **Image and file attachments**
  - Drag & drop file upload
  - Image embedding and preview
  - File attachments with download links
  - Integration with Discord's CDN

- **Advanced formatting**
  - Tables and spreadsheet-like functionality
  - Code blocks with syntax highlighting
  - Markdown support
  - Custom styling options

### Integration & Automation
- **Bot integrations**
  - Carl-bot integration for automated document creation
  - MEE6 integration for server events
  - Custom webhook support
  - Scheduled document updates

- **Export functionality**
  - PDF export with formatting
  - Markdown export
  - HTML export
  - Integration with external services (Google Drive, Notion)

### User Experience
- **Mobile optimization**
  - Touch-friendly editing interface
  - Mobile-specific UI layouts
  - Gesture support for navigation
  - Offline editing capabilities

- **Advanced search**
  - Full-text search across all documents
  - Search filters (author, date, channel)
  - Search highlighting and snippets
  - Saved searches

## Phase 3 & Beyond

### Enterprise Features
- **Advanced permissions**
  - Custom role-based access control
  - Document-level permissions
  - Approval workflows
  - Review and approval processes

- **Analytics & insights**
  - Document engagement metrics
  - User activity analytics  
  - Popular content identification
  - Usage patterns and trends

### Platform & API
- **API for third-party integrations**
  - REST API for external apps
  - Webhook system for events
  - Plugin/extension system
  - Developer documentation

- **Multi-platform expansion**
  - Standalone web application
  - Desktop application
  - API for other platforms

### Advanced Document Features
- **Document workflows**
  - Draft → Review → Published states
  - Comment resolution tracking
  - Document approval chains
  - Scheduled publishing

- **Version control**
  - Git-like branching and merging
  - Compare versions side-by-side
  - Restore previous versions
  - Change attribution and blame view

## Community Ideas

*This section can grow as we get feedback from users*

### Potential User Requests
- Document categories and folders
- Document favorites/bookmarking
- Document sharing outside Discord
- Integration with calendar apps for meeting notes
- Automated backups
- Document encryption for sensitive content

## Research & Experiments

### Technical Explorations
- Alternative rich text editors
- Real-time collaboration algorithms
- Performance optimization for large documents
- Alternative database solutions
- Caching strategies

### UX/UI Research
- Mobile editing patterns
- Collaborative editing behaviors
- Document organization preferences
- Notification preferences

## Rejected Ideas

*Ideas we've considered but decided against*

### Why Rejected
- **Full Google Docs clone**: Too complex, defeats purpose of simple Discord integration
- **Video/audio embedding**: Security concerns, bandwidth issues
- **AI-powered writing assistance**: Out of scope, expensive to implement
- **Advanced document layouts**: Would complicate mobile experience

---

## How to Use This Backlog

1. **Prioritization**: Items higher up are generally higher priority
2. **User feedback**: Add new ideas based on community requests
3. **Technical feasibility**: Consider implementation complexity when planning
4. **Resource allocation**: Balance new features with maintenance and bug fixes

## Project Naming Ideas

*Alternative names to consider for the project*

### Current: `discord-canvases`
**Pros**: Plural suggests multiple documents, references Slack Canvas origin
**Cons**: "Canvas" might suggest artistic/visual creation rather than documents

### Descriptive Options
- `discord-docs` - Simple, clear, immediately understandable
- `discord-notes` - Emphasizes note-taking use case
- `discord-pages` - Clean, document-focused
- `shared-docs` - Highlights collaboration aspect
- `channel-docs` - Emphasizes Discord channel integration

### Branded Options
- `CollabDocs` - Collaborative documents
- `TeamPages` - Team-focused pages  
- `ServerDocs` - Discord server documents
- `GroupNotes` - Community note-taking
- `CommunityDocs` - Broader community focus

### Considerations
- Should be easy to remember and type
- Should clearly indicate document/collaboration functionality
- Should fit Discord terminology (servers, channels, etc.)
- Should avoid confusion with existing Discord features

## Contributing Ideas

If you have ideas for Discord Canvases:
1. Check if it's already listed here
2. Consider if it fits the core vision (simple collaborative editing for Discord)
3. Add to appropriate section with rationale
4. Include any technical considerations or user feedback 