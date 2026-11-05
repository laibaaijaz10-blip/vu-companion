import React, { useState, useEffect } from 'react';
import {
  MessagesSquare,
  MessageSquarePlus,
  ThumbsUp,
  CheckCircle2,
  Filter,
  Search,
  Tag,
  User,
  GraduationCap,
  Sparkles,
  Send,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  HelpCircle,
  Clock,
} from 'lucide-react';
import {
  DiscussionPost,
  DiscussionReply,
  INITIAL_DISCUSSIONS,
  filterDiscussions,
} from '../utils/discussionBoardData';
import { VU_COURSES } from '../utils/vuCoursesData';

interface DiscussionBoardProps {
  onDoubtActivityReward?: () => void;
}

export const DiscussionBoard: React.FC<DiscussionBoardProps> = ({ onDoubtActivityReward }) => {
  // Discussions list persisted in localStorage
  const [posts, setPosts] = useState<DiscussionPost[]>(() => {
    try {
      const saved = localStorage.getItem('vu_discussions_v2');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_DISCUSSIONS;
  });

  // Filters state
  const [selectedSemester, setSelectedSemester] = useState<number | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusTab, setStatusTab] = useState<'all' | 'unanswered' | 'answered' | 'top'>('all');

  // Active expanded question ID
  const [expandedPostId, setExpandedPostId] = useState<string | null>('disc-1');

  // "Ask a Doubt" Modal / Form state
  const [showAskForm, setShowAskForm] = useState<boolean>(false);
  const [formCourse, setFormCourse] = useState<string>('CS402');
  const [formSemester, setFormSemester] = useState<number>(4);
  const [formCategory, setFormCategory] = useState<DiscussionPost['category']>('CS/IT');
  const [formTitle, setFormTitle] = useState<string>('');
  const [formDescription, setFormDescription] = useState<string>('');
  const [formCode, setFormCode] = useState<string>('');
  const [formAuthor, setFormAuthor] = useState<string>('');
  const [formRole, setFormRole] = useState<string>('Semester 4 Student');

  // Reply input state per expanded post
  const [replyText, setReplyText] = useState<string>('');
  const [replyAuthor, setReplyAuthor] = useState<string>('');
  const [replyRole, setReplyRole] = useState<string>('Senior Alum / TA');

  // Persist discussions
  useEffect(() => {
    try {
      localStorage.setItem('vu_discussions_v2', JSON.stringify(posts));
    } catch {
      // ignore
    }
  }, [posts]);

  // Handle upvoting post
  const handleUpvotePost = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return { ...p, upvotes: p.upvotes + 1 };
        }
        return p;
      })
    );
  };

  // Handle upvoting reply
  const handleUpvoteReply = (postId: string, replyId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            replies: p.replies.map((r) => {
              if (r.id === replyId) {
                return { ...r, upvotes: r.upvotes + 1 };
              }
              return r;
            }),
          };
        }
        return p;
      })
    );
  };

  // Handle creating new question
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formDescription.trim()) return;

    const matchedCourse = VU_COURSES.find(
      (c) => c.code.toLowerCase() === formCourse.toLowerCase().trim()
    );

    const newPost: DiscussionPost = {
      id: `disc-${Date.now()}`,
      courseCode: formCourse.toUpperCase().trim(),
      courseName: matchedCourse ? matchedCourse.title : `${formCourse.toUpperCase()} Course`,
      semester: formSemester,
      category: formCategory,
      title: formTitle.trim(),
      description: formDescription.trim(),
      codeSnippet: formCode.trim() ? formCode.trim() : undefined,
      author: formAuthor.trim() || 'VU Student',
      authorRole: formRole.trim() || `Semester ${formSemester} Student`,
      createdAt: 'Just now',
      upvotes: 1,
      replies: [],
      tags: [formCourse.toUpperCase(), `Semester ${formSemester}`],
    };

    setPosts([newPost, ...posts]);
    setExpandedPostId(newPost.id);
    setShowAskForm(false);
    setFormTitle('');
    setFormDescription('');
    setFormCode('');

    if (onDoubtActivityReward) {
      onDoubtActivityReward();
    }
  };

  // Handle submitting reply
  const handleAddReply = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newReply: DiscussionReply = {
      id: `rep-${Date.now()}`,
      author: replyAuthor.trim() || 'Helpful Senior',
      authorRole: replyRole.trim() || 'VU Senior / TA',
      date: 'Just now',
      content: replyText.trim(),
      upvotes: 1,
      isVerifiedSolution: false,
    };

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            replies: [...p.replies, newReply],
          };
        }
        return p;
      })
    );

    setReplyText('');
    if (onDoubtActivityReward) {
      onDoubtActivityReward();
    }
  };

  // Filter posts
  const filteredPosts = filterDiscussions(posts, {
    semester: selectedSemester,
    category: selectedCategory,
    searchTerm: searchQuery,
    statusTab: statusTab,
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              <MessagesSquare className="w-3.5 h-3.5" />
              <span>VU Community Q&A & Senior Peer Mentorship</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Student Discussion & Doubt Board
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
              Connect with fellow VU students, seniors, and alumni across Semesters 1 to 8. Ask tricky course
              doubts, get verified assignment fixes, and share past-paper solutions.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAskForm((prev) => !prev)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-xs cursor-pointer shrink-0"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>{showAskForm ? 'Close Question Form' : 'Ask a Doubt / Question'}</span>
          </button>
        </div>
      </div>

      {/* "Ask a Question" Form Drawer */}
      {showAskForm && (
        <form
          onSubmit={handleCreatePost}
          className="rounded-2xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50/40 dark:bg-indigo-950/30 p-6 space-y-4 animate-in fade-in"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <MessageSquarePlus className="w-4 h-4 text-indigo-600" />
              <span>Post New Academic Doubt or Question</span>
            </h3>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
              Earn +1 Fish Kibble 🐟 for Cat Milo!
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Course Code
              </label>
              <input
                type="text"
                required
                value={formCourse}
                onChange={(e) => setFormCourse(e.target.value.toUpperCase())}
                placeholder="e.g. CS402, MTH101, MGT201"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white uppercase font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Semester (1 - 8)
              </label>
              <select
                value={formSemester}
                onChange={(e) => setFormSemester(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <option key={sem} value={sem}>
                    Semester {sem}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Major / Domain
              </label>
              <select
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value as DiscussionPost['category'])}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
              >
                <option value="CS/IT">Computer Science / IT</option>
                <option value="Management">Management / Business</option>
                <option value="Math/Stats">Math / Statistics</option>
                <option value="Psychology">Psychology / Sociology</option>
                <option value="English">English / Literature</option>
                <option value="Education">Education / Others</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Question Title / Specific Problem Statement
            </label>
            <input
              type="text"
              required
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              placeholder="e.g. How to resolve pointer segmentation fault in CS201 Assignment 2?"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Detailed Description & What You Tried
            </label>
            <textarea
              rows={3}
              required
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              placeholder="Explain what handout lecture you are studying, what error appeared, or what midterm past-paper question is confusing you..."
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Code Snippet / Equation / Handout Reference (Optional)
            </label>
            <textarea
              rows={2}
              value={formCode}
              onChange={(e) => setFormCode(e.target.value)}
              placeholder="int* ptr = new int[50]; // or formula..."
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white font-mono"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Your Name & Campus City
              </label>
              <input
                type="text"
                value={formAuthor}
                onChange={(e) => setFormAuthor(e.target.value)}
                placeholder="e.g. Ali Raza (Islamabad)"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Academic Role / Semester
              </label>
              <input
                type="text"
                value={formRole}
                onChange={(e) => setFormRole(e.target.value)}
                placeholder="e.g. Semester 4 BSCS Student"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAskForm(false)}
              className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-xs cursor-pointer"
            >
              Publish Question to Board
            </button>
          </div>
        </form>
      )}

      {/* Filter and Search Bar */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by course (CS402), topic (DFA, Pointers, Limits), or keyword..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1 text-xs">
            {[
              { id: 'all', label: 'All Doubts' },
              { id: 'unanswered', label: 'Unanswered' },
              { id: 'answered', label: 'Answered' },
              { id: 'top', label: 'Top Upvoted' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStatusTab(tab.id as typeof statusTab)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  statusTab === tab.id
                    ? 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-200 dark:border-indigo-800'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Semester & Major Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Semester Filter:
          </span>
          <button
            type="button"
            onClick={() => setSelectedSemester('all')}
            className={`px-2 py-1 rounded text-[11px] font-medium border cursor-pointer ${
              selectedSemester === 'all'
                ? 'bg-indigo-600 text-white border-indigo-600 font-bold'
                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            All Semesters
          </button>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
            <button
              key={sem}
              type="button"
              onClick={() => setSelectedSemester(sem)}
              className={`px-2 py-1 rounded text-[11px] font-medium border cursor-pointer ${
                selectedSemester === sem
                  ? 'bg-indigo-600 text-white border-indigo-600 font-bold'
                  : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Sem {sem}
            </button>
          ))}

          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-2">
            Domain:
          </span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs text-slate-700 dark:text-slate-300"
          >
            <option value="all">All Majors</option>
            <option value="CS/IT">Computer Science / IT</option>
            <option value="Management">Management / Business</option>
            <option value="Math/Stats">Math / Statistics</option>
            <option value="Psychology">Psychology</option>
            <option value="English">English</option>
            <option value="Education">Education</option>
          </select>
        </div>
      </div>

      {/* Discussion Posts Feed */}
      <div className="space-y-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => {
            const isExpanded = expandedPostId === post.id;
            const hasVerified = post.replies.some((r) => r.isVerifiedSolution);

            return (
              <div
                key={post.id}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all overflow-hidden shadow-xs"
              >
                {/* Post Summary Header */}
                <div
                  onClick={() => setExpandedPostId(isExpanded ? null : post.id)}
                  className="p-5 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors space-y-3"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="px-2 py-0.5 rounded font-bold font-mono bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                          {post.courseCode}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          Semester {post.semester}
                        </span>
                        <span className="text-slate-400 text-xs">·</span>
                        <span className="text-slate-500 text-xs">{post.category}</span>
                        {hasVerified && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Verified Solution</span>
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-bold text-slate-900 dark:text-white hover:text-indigo-600 transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                        {post.description}
                      </p>
                    </div>

                    {/* Upvote & Expansion indicator */}
                    <div className="flex flex-col items-center gap-1">
                      <button
                        type="button"
                        onClick={(e) => handleUpvotePost(post.id, e)}
                        className="flex flex-col items-center justify-center p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 text-slate-700 dark:text-slate-300 transition-colors"
                        title="Upvote question"
                      >
                        <ThumbsUp className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        <span className="text-xs font-bold mt-0.5">{post.upvotes}</span>
                      </button>

                      <span className="text-slate-400 text-xs">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </span>
                    </div>
                  </div>

                  {/* Meta footer */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-semibold text-slate-700 dark:text-slate-300">{post.author}</span>
                      <span>({post.authorRole})</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.createdAt}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-medium text-indigo-600 dark:text-indigo-400">
                        {post.replies.length} {post.replies.length === 1 ? 'Reply' : 'Replies'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expanded Thread & Replies */}
                {isExpanded && (
                  <div className="p-5 bg-slate-50/70 dark:bg-slate-950/50 border-t border-slate-200 dark:border-slate-800 space-y-5">
                    {/* Full Description & Code */}
                    <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Full Doubt Details:
                      </p>
                      <p className="text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed font-serif italic pl-3 border-l-2 border-indigo-500 bg-indigo-50/20 dark:bg-indigo-950/20 py-1.5 rounded-r-lg">
                        “{post.description}”
                      </p>

                      {post.codeSnippet && (
                        <div className="rounded-lg bg-slate-950 p-3 text-emerald-400 font-mono text-xs overflow-x-auto border border-slate-800">
                          <pre>{post.codeSnippet}</pre>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {post.tags.map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Replies List */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                        <span>Solutions & Peer Advice ({post.replies.length}):</span>
                        <span className="text-slate-400 font-normal">Answers by verified seniors & classmates</span>
                      </div>

                      {post.replies.length > 0 ? (
                        post.replies.map((reply) => (
                          <div
                            key={reply.id}
                            className={`p-4 rounded-xl border transition-all space-y-2 ${
                              reply.isVerifiedSolution
                                ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-950/20'
                                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                            }`}
                          >
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2">
                                <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                                <span className="font-bold text-slate-900 dark:text-white">
                                  {reply.author}
                                </span>
                                <span className="text-[11px] text-slate-500">({reply.authorRole})</span>
                                {reply.isVerifiedSolution && (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3" />
                                    <span>Verified by Senior</span>
                                  </span>
                                )}
                              </div>

                              <button
                                type="button"
                                onClick={() => handleUpvoteReply(post.id, reply.id)}
                                className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition-colors p-1"
                              >
                                <ThumbsUp className="w-3.5 h-3.5" />
                                <span>{reply.upvotes}</span>
                              </button>
                            </div>

                            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed font-serif italic pl-3 border-l-2 border-emerald-500/60 bg-emerald-50/20 dark:bg-emerald-950/20 py-1.5 rounded-r-lg">
                              “{reply.content}”
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 text-center text-xs text-slate-500">
                          No replies yet. Be the first to help this student!
                        </div>
                      )}
                    </div>

                    {/* Add Reply Form */}
                    <form
                      onSubmit={(e) => handleAddReply(post.id, e)}
                      className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3"
                    >
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        Write a Solution or Helpful Tip:
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={replyAuthor}
                          onChange={(e) => setReplyAuthor(e.target.value)}
                          placeholder="Your Name (e.g. Asim Raza)"
                          className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white"
                        />
                        <input
                          type="text"
                          value={replyRole}
                          onChange={(e) => setReplyRole(e.target.value)}
                          placeholder="Your Role (e.g. 7th Sem Senior / Alum)"
                          className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white"
                        />
                      </div>

                      <textarea
                        rows={3}
                        required
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write step-by-step guidance, correct code, or handout lecture reference..."
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white placeholder-slate-400"
                      />

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] text-slate-500">
                          Cat Milo rewards you +1 🐟 for helping a classmate!
                        </span>
                        <button
                          type="submit"
                          className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit Solution</span>
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="p-12 text-center text-slate-400 space-y-2 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
            <MessagesSquare className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-700" />
            <p className="text-sm font-medium">No discussions found matching your filter.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedSemester('all');
                setSelectedCategory('all');
                setSearchQuery('');
                setStatusTab('all');
              }}
              className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
