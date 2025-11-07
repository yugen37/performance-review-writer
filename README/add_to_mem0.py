#!/usr/bin/env python3
"""
Add AltaGas COBE Investigation complete communication trail to Mem0
"""

from mem0 import MemoryClient
import os

# Initialize Mem0 client
api_key = os.getenv("MEM0_API_KEY", "m0-4Yr9vh1pWFt6fd4U2z6A73BrXFchGvv6YuGKJUHN")
client = MemoryClient(api_key=api_key)

# User ID for project_oak
user_id = "cursor_user"

print("🚀 Starting to store AltaGas COBE Investigation communication trail in Mem0...\n")

# Read the complete communication trail document
trail_path = "/Users/yugenmohan/Desktop/Project 1k/LL Performance Review Writer/README/ALTAGAS-COMPLETE-COMMUNICATION-TRAIL.md"
with open(trail_path, 'r', encoding='utf-8') as f:
    full_trail = f.read()

# Break into logical sections for better retrieval
memories = [
    {
        "memory": """Complete AltaGas COBE Investigation Email Thread Timeline (Sep 16 - Oct 31, 2024)

FULL CHRONOLOGICAL SEQUENCE:
- Sep 16, 2025: Kamaria initiates COBE investigation, introduces Amy Schuh as external investigator
- Sep 17, 2025: Yugen requests safeguards (confidentiality, use of findings, interim safeguards, health accommodation for written Q&A)
- Sep 18, 2025: Amy Schuh denies accommodation, insists on live interview
- Sep 19, 2025: Yugen escalates to Vern Yu expressing safety concerns
- Sep 19, 2025: Vern responds, directs all correspondence to Kamaria
- Sep 23, 2025: Kamaria requests 2-hour Teams meeting
- Sep 24, 2025: Yugen requests time until Sep 29
- Sep 29, 2025: Yugen sends detailed policy/process clarification questions
- Sep 29, 2025: Amy requests 30-minute call instead
- Oct 1, 2025: Yugen reiterates accommodation request for written process
- Oct 7, 2025: Kamaria provides written questions, requests response by Oct 10 (but scope narrowed to resignation email only, zero questions on governance complaint)
- Oct 10, 2025: Yugen requests extension to Oct 17
- Oct 17, 2025: Yugen asks 3 critical questions: (a) COBE vs Whistleblowing investigation, (b) Audit Committee oversight, (c) Amy's role (investigator vs legal)
- Oct 22, 2025: Kamaria responds, disagrees Yugen was "actively prevented from participating", reiterates welcome to participate
- Oct 31, 2024: Yugen sends Final Positioning Statement to Amy Schuh, Kamaria Ellis, and Vern Yu - focuses on investigation process violations, cites securities law (NI 52-110, NI 52-109), sets Nov 10 deadline for Corporate Secretary notification

THREAD COMPLETE: Sep 16, 2025 through Oct 31, 2024 (Final Positioning Statement)""",
        "metadata": {"thread_start": "2025-09-16", "thread_end": "2024-10-31", "final_document": "Final Positioning Statement", "participants": ["Yugen Mohan", "Kamaria Ellis", "Amy Schuh", "Vern Yu"]}
    },
    {
        "memory": """October 31, 2024 - Final Positioning Statement sent to Amy Schuh, Kamaria Ellis, and Vern Yu

This was the final communication in the AltaGas COBE investigation email thread. The positioning statement focused on investigation process violations and procedural inconsistencies from September 16 - October 22, 2025, NOT rehashing original allegations.

KEY FOCUS: How AltaGas handled the investigation process, not the original governance violations.

FIVE DOCUMENTED FACTUAL INCONSISTENCIES:

1. Audit Committee Oversight Unconfirmed - Four explicit requests for confirmation went unanswered. CEO confirmed COBE (management function) leading investigation, not Board-level oversight. Whistleblower complaint involving Board-reporting executives investigated by management.

2. Investigation Scope Narrowed After Accommodation Request - Sep 16: Investigation into Sep 10 governance complaint. Sep 17: Health accommodation requested (written format). Oct 7: Accommodation granted BUT scope narrowed to Sep 1 resignation email only. Zero questions about governance violations; all 8 questions focused on resignation content.

3. Investigator Independence Unclarified - Represented as "external investigator" suggesting independence. Then identified as legal counsel: "AltaGas retained my firm, Morgan, Lewis & Bockius LLP". Direct question about dual role (investigator vs. legal counsel) remained unanswered.

4. Investigation Design Contradictions - Amy Schuh: Live interview "CRITICAL" and "NECESSARY" - written format would "LIMIT ability to investigate". Kamaria Ellis: Accommodation granted, but claims "GOOD UNDERSTANDING" of governance concerns without that participation. Internal contradiction: Either live format wasn't necessary, or investigation proceeded despite limitations.

5. Procedural Safeguards Unanswered - Multiple requests for procedural information went unanswered: Retaliation reporting procedures, Investigation stages/steps, Audit Committee oversight confirmation, Investigator independence/clarity.

SECURITIES LAW CITATIONS:
- NI 52-110 (Audit Committee standards)
- NI 52-109 (Certification of Disclosure Controls)
- Governance concerns: Ethics Committee member (David Marks) committing violations
- Pattern of governance failures at senior leadership levels
- Board oversight responsibilities under securities regulations

TIMELINE CONTEXT:
- Oct 31: Final positioning statement sent (warning before escalation)
- Nov 10: Corporate Secretary notification deadline (10 days to respond)
- This communication positioned before board-level escalation""",
        "metadata": {"date": "2024-10-31", "recipients": ["Amy Schuh", "Kamaria Ellis", "Vern Yu"], "document_type": "positioning_statement", "focus": "investigation_process_violations"}
    },
    {
        "memory": """October 31, 2024 Final Positioning Statement - Audit Committee Oversight Unconfirmed

FACTS FROM EMAIL THREAD:
- Sep 17 (Yugen): "Will the investigator's findings be reported to management or directly to the Audit Committee and Board?"
- Oct 7 (Kamaria): Unable to provide written responses to process questions
- Oct 17 (Yugen): "Can you please confirm that the investigation is conducted under the direction and oversight of the Audit Committee?"
- Oct 22 (Kamaria): "I am not in a position to answer the questions you posed below."

WHY THIS IS CONCERNING:
- September 10 whistleblower complaint involved governance violations by Internal Audit leadership reporting to Audit Committee
- Whistleblowing Policy specifies concerns involving "internal controls, auditing matters, potential disclosure" fall under Audit Committee oversight
- Four explicit requests for confirmation of Audit Committee oversight went unanswered
- September 19: CEO Vern Yu confirmed: "The COBE office is leading the investigation process with the support of external counsel." COBE is a management function, not a Board-level governance body
- Whistleblower complaint involving Board-reporting executives being investigated by management without confirmed Board-level oversight""",
        "metadata": {"date": "2024-10-31", "issue": "audit_committee_oversight", "requests_count": 4}
    },
    {
        "memory": """October 31, 2024 Final Positioning Statement - Investigation Scope Narrowed After Accommodation Request

TIMELINE:
- Sep 10: Submitted detailed whistleblower complaint to CEO regarding governance violations
- Sep 16: Kamaria initiates COBE investigation into "allegations" with "external investigator"
- Sep 17: Requested health accommodation for written participation; asked whether findings report to Board
- Oct 7 (Kamaria/Amy): Accommodation granted BUT questions "focus on concerns you raised in your September 1, 2025 resignation email"

QUESTION ANALYSIS (Oct 7):
- Total questions: 8
- Questions addressing September 10 governance complaint: 0
- Questions purely focusing on September 1 resignation content: 8

WHY THIS IS CONCERNING:
- Investigation scope narrowed from governance violations to employment matters after accommodation request
- Simultaneously claimed to have "good understanding" of governance complaint without asking any questions about it
- Nothing in whistleblowing report mentioned resignation or its details
- Resignation content received more attention than governance violations after accommodation request""",
        "metadata": {"date": "2024-10-31", "issue": "scope_narrowing", "governance_questions": 0, "resignation_questions": 8}
    },
    {
        "memory": """October 31, 2024 Final Positioning Statement - Securities Law Citations

REFERENCED REGULATIONS:
- NI 52-110 (Audit Committee standards)
- NI 52-109 (Certification of Disclosure Controls)

GOVERNANCE CONCERNS CITED:
- Ethics Committee member (David Marks) committing violations
- Pattern of governance failures at senior leadership levels
- Failure to investigate fraud concerns raises governance risk questions
- Board oversight responsibilities under securities regulations

STRATEGIC CONTEXT:
- Oct 31: Final positioning statement sent (warning before escalation)
- Nov 10: Corporate Secretary notification deadline (10 days to respond)
- This communication positioned before board-level escalation
- Securities law citations = Maximum pressure point for AltaGas
- Governance failures create securities compliance questions that require board-level attention""",
        "metadata": {"date": "2024-10-31", "securities_regulations": ["NI 52-110", "NI 52-109"], "escalation_timeline": "Nov 10 Corporate Secretary"}
    }
]

# Add each memory to Mem0
for i, mem in enumerate(memories, 1):
    try:
        messages = [
            {
                "role": "user",
                "content": f"Store this AltaGas COBE Investigation information: {mem['memory']}"
            },
            {
                "role": "assistant",
                "content": "I've stored the AltaGas COBE Investigation information in memory."
            }
        ]
        
        result = client.add(messages, user_id=user_id, metadata=mem.get("metadata", {}))
        print(f"✅ Memory {i}/{len(memories)} added successfully")
        if isinstance(result, dict):
            print(f"   ID: {result.get('id', 'N/A')}\n")
        else:
            print(f"   Result: {result}\n")
    except Exception as e:
        print(f"❌ Error adding memory {i}: {str(e)}\n")

print("🎉 Complete! All AltaGas COBE Investigation communication trail stored in Mem0.")

