import { useEffect, useMemo, useRef, useState } from 'react';
import AppIcon from '@/components/common/AppIcon';
import {
  dashboardModules,
  type ModuleItem,
  type UserRole,
} from '@/data/modules';
import { getWithExpiry } from '@/utils/auth';

type TicketFormData = {
  name: string;
  username: string;
  mobile: string;
  module: string;
  message: string;
  attachment: File | null;
};

type SnackbarState = {
  open: boolean;
  type: 'success' | 'error';
  message: string;
};

type LeafModuleOption = {
  label: string;
  value: string;
};

type FormErrors = {
  module: boolean;
  message: boolean;
  attachment: boolean;
};

const initialForm: TicketFormData = {
  name: '',
  username: '',
  mobile: '',
  module: '',
  message: '',
  attachment: null,
};

const MIN_FILE_SIZE = 100 * 1024;
const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

function filterModulesByRole(
  modules: ModuleItem[],
  role?: UserRole,
): ModuleItem[] {
  if (!role) return [];

  const filterItems = (items: ModuleItem[]): ModuleItem[] => {
    return items
      .map((item) => {
        const isAllowed = !item.roles || item.roles.includes(role);

        if (item.children?.length) {
          const filteredChildren = filterItems(item.children);

          if (filteredChildren.length > 0) {
            return { ...item, children: filteredChildren };
          }

          if (item.to && isAllowed) {
            return { ...item, children: undefined };
          }

          return null;
        }

        if (item.to && isAllowed) {
          return item;
        }

        return null;
      })
      .filter(Boolean) as ModuleItem[];
  };

  return filterItems(modules);
}

function extractLeafModules(
  items: ModuleItem[],
  parents: string[] = [],
): LeafModuleOption[] {
  return items.flatMap((item) => {
    const currentPath = [...parents, item.title];

    if (item.children?.length) {
      return extractLeafModules(item.children, currentPath);
    }

    if (item.to) {
      return [
        {
          label: currentPath.join(' > '),
          value: item.to,
        },
      ];
    }

    return [];
  });
}

function TicketWidget() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<TicketFormData>(initialForm);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    type: 'success',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({
    module: false,
    message: false,
    attachment: false,
  });

  const successCloseTimer = useRef<number | null>(null);
  const autoHideTimer = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const user = getWithExpiry('user', true);

  const allowedLeafModules = useMemo(() => {
    const filtered = filterModulesByRole(dashboardModules, user?.role);
    return extractLeafModules(filtered);
  }, [user?.role]);

  useEffect(() => {
    return () => {
      if (successCloseTimer.current)
        window.clearTimeout(successCloseTimer.current);
      if (autoHideTimer.current) window.clearTimeout(autoHideTimer.current);
    };
  }, []);

  const openDialog = () => {
    setIsDialogOpen(true);
    setSnackbar((prev) => ({ ...prev, open: false }));

    setFormData({
      name: user?.name || user?.username || '',
      username: user?.username || '',
      mobile: user?.mobile || '',
      module: '',
      message: '',
      attachment: null,
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const closeDialog = () => {
    if (isSubmitting) return;

    setIsDialogOpen(false);
    setSnackbar((prev) => ({ ...prev, open: false }));
    setFormData(initialForm);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const closeSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const showSnackbar = (
    type: 'success' | 'error',
    message: string,
    options?: { autoHide?: boolean; closeDialogAfter?: boolean },
  ) => {
    if (successCloseTimer.current)
      window.clearTimeout(successCloseTimer.current);
    if (autoHideTimer.current) window.clearTimeout(autoHideTimer.current);

    setSnackbar({
      open: true,
      type,
      message,
    });

    if (options?.autoHide) {
      autoHideTimer.current = window.setTimeout(() => {
        setSnackbar((prev) => ({ ...prev, open: false }));
      }, 3000);
    }

    if (options?.closeDialogAfter) {
      successCloseTimer.current = window.setTimeout(() => {
        setSnackbar((prev) => ({ ...prev, open: false }));
        setIsDialogOpen(false);
      }, 1800);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'module' || name === 'message') {
      setErrors((prev) => ({
        ...prev,
        [name]: false,
      }));
    }
  };

  const handleAttachmentChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0] || null;

    if (!file) {
      setFormData((prev) => ({ ...prev, attachment: null }));
      return;
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      event.target.value = '';
      setErrors((prev) => ({ ...prev, attachment: true }));
      showSnackbar('error', 'Only JPG, PNG, WEBP, or PDF files are allowed.');
      return;
    }

    if (file.size < MIN_FILE_SIZE) {
      event.target.value = '';
      setErrors((prev) => ({ ...prev, attachment: true }));
      showSnackbar('error', 'File size must be at least 100 KB.');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      event.target.value = '';
      setErrors((prev) => ({ ...prev, attachment: true }));
      showSnackbar('error', 'File size must not exceed 10 MB.');
      return;
    }

    setFormData((prev) => ({
      ...prev,
      attachment: file,
    }));

    setErrors((prev) => ({
      ...prev,
      attachment: false,
    }));
  };

  const removeAttachment = () => {
    setFormData((prev) => ({
      ...prev,
      attachment: null,
    }));

    setErrors((prev) => ({
      ...prev,
      attachment: true,
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateForm = () => {
    const nextErrors: FormErrors = {
      module: !formData.module.trim(),
      message: !formData.message.trim(),
      attachment: !formData.attachment,
    };

    setErrors(nextErrors);

    if (nextErrors.module) {
      showSnackbar('error', 'Please select a module.');
      return false;
    }

    if (nextErrors.message) {
      showSnackbar('error', 'Please enter your message.');
      return false;
    }

    if (nextErrors.attachment) {
      showSnackbar('error', 'Please attach a file.');
      return false;
    }

    return true;
  };

  const submitTicket = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('username', formData.username);
      payload.append('mobile', formData.mobile);
      payload.append('module', formData.module);
      payload.append('message', formData.message);
      if (formData.attachment) {
        payload.append('attachment', formData.attachment);
      }

      // Replace with real API call
      await new Promise((resolve) => setTimeout(resolve, 1200));

      showSnackbar('success', 'Ticket submitted successfully.', {
        autoHide: true,
        closeDialogAfter: true,
      });

      setFormData({
        name: user?.name || user?.username || '',
        username: user?.username || '',
        mobile: user?.mobile || '',
        module: '',
        message: '',
        attachment: null,
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch {
      showSnackbar('error', 'Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-15 right-8 z-50">
        <div className="group relative flex items-center justify-end">
          <div className="pointer-events-none absolute right-16 translate-x-2 whitespace-nowrap rounded-lg bg-slate-900 px-3 py-2 text-sm text-white opacity-0 shadow-lg transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 dark:bg-slate-100 dark:text-black">
            Raise a ticket
            <div className="absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 bg-slate-900 dark:bg-slate-100" />
          </div>

          <button
            type="button"
            aria-label="Raise a ticket"
            onClick={openDialog}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition hover:scale-105 hover:bg-blue-700"
          >
            <AppIcon name="plus-circle" className="h-6 w-6" />
          </button>
        </div>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 px-4">
          <div className="relative w-full max-w-2xl">
            <div className="rounded-2xl bg-white shadow-2xl dark:bg-slate-900 dark:shadow-none dark:ring-1 dark:ring-slate-800">
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Raise a ticket
                </h2>

                <button
                  type="button"
                  onClick={closeDialog}
                  disabled={isSubmitting}
                  className="rounded-md p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                  aria-label="Close dialog"
                >
                  <AppIcon name="close" className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={submitTicket} className="space-y-4 px-5 py-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="ticket-name"
                      className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      Name
                    </label>
                    <input
                      id="ticket-name"
                      name="name"
                      type="text"
                      value={formData.name}
                      readOnly
                      className="w-full rounded-xl border border-slate-300 bg-slate-100 px-4 py-3 text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="ticket-username"
                      className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      Username
                    </label>
                    <input
                      id="ticket-username"
                      name="username"
                      type="text"
                      value={formData.username}
                      readOnly
                      className="w-full rounded-xl border border-slate-300 bg-slate-100 px-4 py-3 text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="ticket-mobile"
                    className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Mobile
                  </label>
                  <input
                    id="ticket-mobile"
                    name="mobile"
                    type="text"
                    value={formData.mobile}
                    readOnly
                    className="w-full rounded-xl border border-slate-300 bg-slate-100 px-4 py-3 text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="ticket-module"
                    className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Module
                  </label>
                  <select
                    id="ticket-module"
                    name="module"
                    value={formData.module}
                    onChange={handleChange}
                    className={`w-full rounded-xl border bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 dark:bg-slate-950 dark:text-slate-100 ${
                      errors.module
                        ? 'border-red-500'
                        : 'border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    <option value="">Please select module</option>
                    {allowedLeafModules.map((module) => (
                      <option key={module.value} value={module.value}>
                        {module.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="ticket-message"
                    className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Message
                  </label>
                  <textarea
                    id="ticket-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your issue"
                    rows={4}
                    className={`w-full rounded-xl border bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 ${
                      errors.message
                        ? 'border-red-500'
                        : 'border-slate-300 dark:border-slate-700'
                    }`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="ticket-attachment"
                    className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Attachment
                  </label>

                  <div
                    className={`rounded-xl border bg-white px-4 py-3 transition dark:bg-slate-950 ${
                      errors.attachment
                        ? 'border-red-500'
                        : 'border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 text-slate-500 dark:text-slate-300">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                          <AppIcon name="document" className="h-4 w-4" />
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                            {formData.attachment
                              ? formData.attachment.name
                              : 'Choose a document'}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            JPG, PNG, WEBP, or PDF
                          </p>
                        </div>
                      </div>

                      {!formData.attachment && (
                        <div className="shrink-0">
                          <input
                            ref={fileInputRef}
                            id="ticket-attachment"
                            name="attachment"
                            type="file"
                            accept=".jpg,.jpeg,.png,.webp,.pdf"
                            onChange={handleAttachmentChange}
                            className="hidden"
                          />

                          <label
                            htmlFor="ticket-attachment"
                            className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                          >
                            <AppIcon name="document" className="h-4 w-4" />
                            Choose File
                          </label>
                        </div>
                      )}

                      {formData.attachment && (
                        <button
                          type="button"
                          onClick={removeAttachment}
                          className="shrink-0 rounded-md p-1 cursor-pointer text-slate-500 transition hover:bg-slate-100 hover:text-red-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-red-400"
                          aria-label="Remove attachment"
                          title="Remove attachment"
                        >
                          <AppIcon name="close" className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Allowed: JPG, PNG, WEBP, PDF · Min 100 KB · Max 10 MB
                  </p>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={closeDialog}
                    disabled={isSubmitting}
                    className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>

            {snackbar.open && (
              <div className="absolute left-1/2 top-full z-10 mt-4 w-full max-w-sm -translate-x-1/2 px-2">
                <div
                  className={`flex items-start justify-between gap-3 rounded-xl px-4 py-3 shadow-xl ${
                    snackbar.type === 'success'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-red-600 text-white'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <AppIcon
                        name={snackbar.type === 'success' ? 'spark' : 'close'}
                        className="h-4 w-4"
                      />
                    </div>
                    <p className="text-sm font-medium">{snackbar.message}</p>
                  </div>

                  <button
                    type="button"
                    onClick={closeSnackbar}
                    className="shrink-0 rounded-md p-1 hover:bg-white/10"
                    aria-label="Close notification"
                  >
                    <AppIcon name="close" className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default TicketWidget;
