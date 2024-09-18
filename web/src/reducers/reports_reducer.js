const initialState = {
  currentReport: {},
  reports: [],
  removedFiles: [],
  loading: false,
  error: null
}

export default (state = initialState, action) => {
  switch(action.type) {
    case 'GET_REPORTS':
      return {
        currentReport: state.currentReport,
        reports: [...action.payload],
        removedFiles: [],
        loading: false,
        error: null
      }
    case 'ADD_REPORT':
      return {
        currentReport: action.payload,
        reports: [...state.reports, action.payload],
        removedFiles: [],
        loading: false,
        error: null
      }
    case 'COPY_REPORT':
      return {
        currentReport: action.payload,
        reports: [...state.reports, action.payload].sort((a, b) => {
          return a.course_date > b.course_date ? -1 : (a.course_date < b.course_date ? 1 : 0)
        }),
        removedFiles: [],
        loading: false,
        error: null
      }
    case 'DELETE_REPORT': 
      return {
        currentReport: state.currentReport._id === action.payload ? {} : state.currentReport,
        reports: state.reports.filter(report => report._id !== action.payload),
        removedFiles: [],
        loading: false,
        error: null
      }
    case 'UPDATE_REPORT':
      const idx = state.reports.findIndex(report => report._id === action.payload._id);
      return {
        currentReport: action.payload,
        reports: [
                    ...state.reports.slice(0, idx), // everything before current obj
                    action.payload,
                    ...state.reports.slice(idx + 1), // everything after current obj
                  ],
        removedFiles: [],
        loading: false,
        error: null
      }
    case "SET_CURRENT_REPORT":
      return {
        currentReport: action.payload,
        reports: state.reports,
        removedFiles: [],
        loading: false,
        error: null
      }
    case "REMOVE_UPLOADED_FILE":
      let _report = state.currentReport;
      _report.audios_files = _report.audios_files.filter(f => f.path !== action.payload.file.path);
      const index = state.reports.findIndex(report => report._id === action.payload.report_id);
      return {
        currentReport: _report,
        reports: [
                    ...state.reports.slice(0, index), // everything before current obj
                    _report,
                    ...state.reports.slice(index + 1), // everything after current obj
                  ],
        removedFiles: [...state.removedFiles, action.payload.file],
        loading: false,
        error: null
      }
    default:
      return state;
  }
};